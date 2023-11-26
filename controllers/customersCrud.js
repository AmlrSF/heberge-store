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

    try {
        // Check if the email is already registered
        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ error: 'Email already in use' });
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
        res.status(201).json(savedCustomer);
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
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Compare the entered password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, customer.passwordHash);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
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
            // Other optional configurations (e.g., secure, sameSite) based on your requirements
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
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Send the customer's profile information
        res.status(200).json({ profile: customer });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    loginCustomer,
    registerCustomer,
    getProfile
} 
  