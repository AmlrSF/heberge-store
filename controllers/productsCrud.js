//Loads environment variables from .env file
require('dotenv').config()
const cloudinary = require('cloudinary').v2;

const Product = require('../schema/product');

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//getAllPosts
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to fetch products, please try again' });
  }
};

//post a product
const postProduct = async (req, res) => {
    try {
      const { name, price, description, category, featured, tag, image } = req.body;
  
      // Upload the image to Cloudinary
      const photoUrl = await cloudinary.uploader.upload(image);
  
      // Create a new product document
      const newProduct = new Product({
        name,
        price,
        description,
        category,
        featured,
        tag,
        image: photoUrl.url, // Store the Cloudinary image URL in your product document
      });
  
      // Save the new product to the database
      await newProduct.save();
  
      console.log('Product created:', newProduct);
  
      res.status(201).json({ success: true, message: 'Product created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Unable to create a product, please try again' });
    }
  };


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