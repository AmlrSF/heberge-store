const express = require('express');
const router = express.Router();
const {
  postComment,
  getComments,
  getCommentsByCustomer,
  deleteAllComments,
  deleteCommentById,
  updateCommentById
} = require('../controllers/commentCrud');


router.route('/')
  .post(postComment)
  .get(getComments)
  .delete(deleteAllComments);

router.route('/:id')
  .get(getCommentsByCustomer)
  .delete(deleteCommentById)
  .put(updateCommentById);

module.exports = router;
