require('dotenv').config()
const cloudinary = require('cloudinary').v2;

const Customer = require("../schema/customers");
const bcrypt = require('bcrypt');


// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//getAllPosts
const PostCostmers = async (req, res) => {
   
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        profileImage,
        bio,
        password,
    } = req.body;


     // Upload the image to Cloudinary
    const photoUrl = await cloudinary.uploader.upload(profileImage);
      

    // Generate a salt and hash the password
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error('Error generating salt:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const newCustomer = new Customer({
                firstName,
                lastName,
                email,
                phoneNumber,
                profileImage : photoUrl.url,
                bio,
                passwordHash: hash,
            });

            try {
                const savedCustomer = await newCustomer.save();
                res.status(201).json(savedCustomer);
            } catch (error) {
                console.error('Error saving customer:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    });
 
};

module.exports = {
    PostCostmers
} 
  