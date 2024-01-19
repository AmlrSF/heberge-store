// Import necessary modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define FTP schema
const CMSSchema = new Schema({
  domain: {
    type: Schema.Types.ObjectId,
    ref: 'Domain',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  username: String,
  password: String,
  
});

const CMS = mongoose.model('CMS', CMSSchema);

module.exports = CMS;