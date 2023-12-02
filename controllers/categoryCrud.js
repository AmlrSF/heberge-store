
require('dotenv').config()
const cloudinary = require('cloudinary').v2;

const Category = require("../schema/category");
// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCategory = async (req, res) => {
  const { name, description,image } = req.body;
  try {
    const photoUrl = await cloudinary.uploader.upload(image);

    const newCategory = await Category.create({
      name,
      description,
      image:photoUrl.url
    });

    

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAllCategories = async (req, res) => {
  try {
    await Category.deleteMany({});
    res.json({ message: 'All categories deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  try {

    if(req.body.image){
      const photoUrl = await cloudinary.uploader.upload(req.body.image);
      req.body.image = photoUrl.url;
    }

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCategoryById = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (deletedCategory) {
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
};
