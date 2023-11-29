require('dotenv').config()
const cloudinary = require('cloudinary').v2;

const Customer = require("../schema/customers");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const registerCustomer = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        profileImage,
        bio,
        password,
    } = req.body;

    console.log(req.body);

    try {
        // Check if the email is already registered
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(201).json({success: false,  error: 'Email already in use' });
        }

        // Upload the image to Cloudinary
        const photoUrl = await cloudinary.uploader.upload(profileImage);

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newCustomer = new Customer({
            firstName,
            lastName,
            email,
            phoneNumber,
            profileImage: photoUrl.url,
            bio,
            passwordHash: hash,
        });

        const savedCustomer = await newCustomer.save();
        res.status(201).json({success:true, savedCustomer});
    } catch (error) {
        console.error('Error during customer registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const loginCustomer = async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });

        if (!customer) {
            return res.status(200).json({success:false,  error: 'Customer not found' });
        }

        // Compare the entered password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, customer.passwordHash);

        if (!passwordMatch) {
            return res.status(200).json({success:false, error: 'Invalid password' });
        }

        // Perform additional logic for the first login to set the username
        if (!customer.username) {
            // You can set the username based on some logic or use the email as the username
            const username = email.split('@')[0]; // Example: use the part before '@' in the email
            customer.username = username;
        }

        // Save the updated customer with the username
        await customer.save();

        // Generate JWT token
        const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expires in 1 hour, adjust as needed
        });

        res.cookie('token', token, {
            httpOnly: true, // Make the cookie accessible only via HTTP(S) and not JavaScript
            // Other optiona configurations (e.g., secure, sameSite) based on your requirements
        });

        res.status(200).json({ message: 'Login successful', token, customer });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const getProfile = async (req, res) => {
    try {
        // Get the customer ID from the authenticated request
        const customerId = req.customerId;

        // Find the customer based on the ID
        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({success:false, error: 'Customer not found' });
        }

        // Send the customer's profile information
        res.status(200).json({success:true, customer });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateCustomer = async (req, res) => {
    const customerId = req.params.id; // Assuming you pass the customer ID in the request parameters
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        profileImage,
        bio,
        password,
    } = req.body;

    try {
        // Check if the customer exists
        const existingCustomer = await Customer.findById(customerId);
        if (!existingCustomer) {
            return res.status(404).json({ success: false, error: 'Customer not found' });
        }

        // If the email is being updated, check if the new email is already in use
        if (email && email !== existingCustomer.email) {
            const emailInUse = await Customer.findOne({ email });
            if (emailInUse) {
                return res.status(400).json({ success: false, error: 'Email already in use' });
            }
        }

        // If a new profile image is provided, upload it to Cloudinary
        let updatedProfileImage = existingCustomer.profileImage;
        if (profileImage) {
            const photoUrl = await cloudinary.uploader.upload(profileImage);
            updatedProfileImage = photoUrl.url;
        }

        // If a new password is provided, generate a new hash
        let updatedPasswordHash = existingCustomer.passwordHash;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedPasswordHash = await bcrypt.hash(password, salt);
        }

        // Update customer fields
        existingCustomer.firstName = firstName || existingCustomer.firstName;
        existingCustomer.lastName = lastName || existingCustomer.lastName;
        existingCustomer.email = email || existingCustomer.email;
        existingCustomer.phoneNumber = phoneNumber || existingCustomer.phoneNumber;
        existingCustomer.profileImage = updatedProfileImage;
        existingCustomer.bio = bio || existingCustomer.bio;
        existingCustomer.passwordHash = updatedPasswordHash;

        // Save the updated customer
        const updatedCustomer = await existingCustomer.save();

        res.status(200).json({ success: true, updatedCustomer });
    } catch (error) {
        console.error('Error during customer update:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const deleteCustomerById = async (req, res) => {
    const customerId = req.params.id; // Assuming you pass the customer ID in the request parameters

    try {
        // Check if the customer exists
        const existingCustomer = await Customer.findById(customerId);
        if (!existingCustomer) {
            return res.status(404).json({ success: false, error: 'Customer not found' });
        }

        // Delete the customer
        await existingCustomer.remove();

        res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error during customer deletion:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        // Fetch all customers from the database
        const customers = await Customer.find();

        res.status(200).json({ success: true, customers });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
const getCustomerById = async (req, res) => {
    const customerId = req.params.id; // Assuming you pass the customer ID in the request parameters

    try {
        // Fetch the customer from the database by ID
        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({ success: false, error: 'Customer not found' });
        }

        res.status(200).json({ success: true, customer });
    } catch (error) {
        console.error('Error fetching customer by ID:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
module.exports = {
    loginCustomer,
    registerCustomer,
    getProfile,
    updateCustomer,
    deleteCustomerById,
    getAllCustomers,
    getCustomerById
} 
  