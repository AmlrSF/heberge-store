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
    
    console.log(products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to fetch products, please try again' });
  }
};

//post a product
const postProduct = async (req, res) => {
    try {
      const { name, price, description, category, featured, tag, image,discount,quantity } = req.body;
  
      // Upload the image to Cloudinary
      const photoUrl = await cloudinary.uploader.upload(image);
      
      // Create a new product document
      const newProduct = new Product({
        category,
        description,
        name,
        featured,
        price,
        tag,
        quantity,
        discount,
        image: photoUrl.url, // Store the Cloudinary image URL in your product document
      });
  
      // Save the new product to the database
      await newProduct.save();
  
      console.log('Product created:', newProduct);
  
      res.status(201).json({ success: true, message: 'Product created successfully' });
    } catch (error) {
      console.error(error, "error ");
      res.status(500).json({ success: false, message: 'Unable to create a product, please try again' });
    }
  };



  // Delete a single product by ID
  const deleteSingleProduct = async (req, res) => {
    try {
      const productId = req.params.id; // Assuming the product ID is passed as a parameter
  
      // Use Mongoose to find and delete the product by its ID
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Unable to delete the product, please try again' });
    }
  }
  
  // Retrieve a single product by ID
  const getSingleProduct = async (req, res) => {
    try {
      const productId = req.params.id; // Assuming the product ID is passed as a parameter
  
      // Use Mongoose to find the product by its ID
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Unable to retrieve the product, please try again' });
    }
  }
  
  // Update a single product by ID
  const updateSingleProduct = async (req, res) => {
    try {
      const productId = req.params.id; // Assuming the product ID is passed as a parameter
      const updateData = req.body; // Assuming the updated data is in the request body

      if(req.body.image){
        const photoUrl = await cloudinary.uploader.upload(req.body.image);
        req.body.image = photoUrl.url;
      }
  
      // Use Mongoose to find and update the product by its ID
      const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
      
      console.log(updatedProduct);

      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Unable to update the product, please try again' });
    }
  }
  
// Delete all products
const deleteAllProducts = async (req, res) => {
  try {
    // Use Mongoose to delete all products from the database
    const deleteResult = await Product.deleteMany({});

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No products found to delete' });
    }

    res.status(200).json({ success: true, message: 'All products deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to delete all products, please try again' });
  }
}

module.exports = {
    getAllProducts,
    postProduct,
    getSingleProduct,
    deleteSingleProduct,
    updateSingleProduct,
    deleteAllProducts
}