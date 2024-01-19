// Import necessary modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define FTP schema
const ftpSchema = new Schema({
  domain: {
    type: Schema.Types.ObjectId,
    ref: 'Domain',
    required: true,
  },
  type: {
    type: String,
    enum: ['ssh', 'sftp', 'ftp'],
    required: true,
  },
  host: String,
  username: String,
  password: String,
  port: Number,
});

const FTP = mongoose.model('FTP', ftpSchema);

module.exports = FTP;