const express = require('express');
const router = express.Router();
const {
  getAllTags,
  createTag,
  deleteAllTags,
  getTagById,
  updateTagById,
  deleteTagById
} = require('../controllers/tagsCrud');

router.route('/')
  .get(getAllTags)
  .post(createTag)
  .delete(deleteAllTags);

router.route('/:id')
  .get(getTagById)
  .put(updateTagById)
  .delete(deleteTagById);

module.exports = router;
