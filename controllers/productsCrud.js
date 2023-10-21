//Loads environment variables from .env file
require('dotenv').config()
const cloudinary = require('cloudinary').v2;



// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//getAllPosts

const getAllProducts = async (req,res)=>{
    try {
        res.send('Hello, World!');
    } catch (error) {
        
    }
}

const postProduct = async (req,res)=>{
    try {
        const { name, price, description, category, featured, tag, image } = req.body;
        const photoUrl = await cloudinary.uploader.upload(image);

        console.log(photoUrl);


    } catch (error) {
        res.status(500).json({ success: false, message: 'Unable to create a product, please try again' });
    }
}


const deleteSingleProduct  = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


const getSingleProduct  = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


const UpdateSingleProduct  = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    getAllProducts,
    postProduct,
    getSingleProduct,
    deleteSingleProduct,
    UpdateSingleProduct
}