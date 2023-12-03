const express = require('express');
const router = express.Router();
const {
  postComment,
  getComments,
  getCommentsByCustomer,
  deleteAllComments,
  deleteCommentById,
  updateCommentById,
  getCommentsByProduct,
  getCommentsById
} = require('../controllers/commentCrud');


router.route('/')
  .post(postComment)
  .get(getComments)
  .delete(deleteAllComments);

router.route('/:id')
  .get(getCommentsById)
  .delete(deleteCommentById)
  .put(updateCommentById)

router.route('/product/:id').get(getCommentsByProduct);
router.route('/costumer/:id').get(getCommentsByCustomer);


module.exports = router;
