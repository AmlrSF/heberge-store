const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  category: String,
  description: String,
  name: String,
  featured: Boolean,
  image: String,
  price: String,
  tag: String,
  updateDate: {
    type: Date,
    default: Date.now,
  },
  firstDate: {
    type: Date,
    default: Date.now,
  }
});

const product = mongoose.model('product', productSchema);

module.exports = product;
