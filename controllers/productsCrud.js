
require('dotenv').config()
const cloudinary = require('cloudinary').v2;

const Product = require('../schema/product');
const Comment = require('../schema/comment');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const getAllProducts = async (req, res) => {
  try {
    
    const products = await Product.find();
    
    
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Unable to fetch products, please try again' });
  }
};


const postProduct = async (req, res) => {
    try {
      const { name, price, description, category, featured, tag, image,discount,quantity } = req.body;
  
      
      const photoUrl = await cloudinary.uploader.upload(image);
      
      
      const newProduct = new Product({
        category,
        description,
        name,
        featured,
        price,
        tag,
        quantity,
        discount,
        image: photoUrl.url, 
      });
  
      
      await newProduct.save();
  
      console.log('Product created:', newProduct);
  
      res.status(201).json({ success: true, message: 'Product created successfully' });
    } catch (error) {
      console.error(error, "error ");
      res.status(500).json({ success: false, message: 'Unable to create a product, please try again' });
    }
  };



  
  const deleteSingleProduct = async (req, res) => {
    try {
      const productId = req.params.id; 
  
      
      const deletedProduct = await Product.findByIdAndDelete(productId);
  

      await Comment.deleteMany({productId:productId});


      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Unable to delete the product, please try again' });
    }
  }
  
  
  const getSingleProduct = async (req, res) => {
    try {
      const productId = req.params.id; 
  
      
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
  
  
  const updateSingleProduct = async (req, res) => {
    try {
      const productId = req.params.id; 
      const updateData = req.body; 

      if(req.body.image){
        const photoUrl = await cloudinary.uploader.upload(req.body.image);
        req.body.image = photoUrl.url;
      }
  
      
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
  

const deleteAllProducts = async (req, res) => {
  try {
    
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