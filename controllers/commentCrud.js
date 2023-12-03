const Comment = require('../schema/comment');

// Create a new comment
const postComment = async (req, res) => {
  const { customerId, productId, content } = req.body;

  try {
    const newComment = await Comment.create({
      customerId,
      productId,
      content
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Assuming Comment schema has product and customer fields as references
const getComments = async (req, res) => {
    try {
      const allComments = await Comment.find().populate('product customer');
      res.json(allComments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get comments by customer
const getCommentsByCustomer = async (req, res) => {
  const customerId = req.params.id;

  try {
    const commentsByCustomer = await Comment.find({ customerId });
    res.json(commentsByCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete all comments
const deleteAllComments = async (req, res) => {
  try {
    await Comment.deleteMany({});
    res.json({ message: 'All comments deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete comment by ID
const deleteCommentById = async (req, res) => {
  const commentId = req.params.id;
  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (deletedComment) {
      res.json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update comment by ID
const updateCommentById = async (req, res) => {
  const commentId = req.params.id;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });
    if (updatedComment) {
      res.json(updatedComment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  postComment,
  getComments,
  getCommentsByCustomer,
  deleteAllComments,
  deleteCommentById,
  updateCommentById
};
