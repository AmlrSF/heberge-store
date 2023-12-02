const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String // Assuming you store the image URL as a string
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

