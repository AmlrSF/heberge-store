const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  deleteAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
} = require('../controllers/categoryCrud');

router.route('/')
  .get(getAllCategories)
  .post(createCategory)
  .delete(deleteAllCategories);

router.route('/:id')
  .get(getCategoryById)
  .put(updateCategoryById)
  .delete(deleteCategoryById);

module.exports = router;
