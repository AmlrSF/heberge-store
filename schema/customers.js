const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  profileImage: String, 
  passwordHash: String, 
  bio: String,
  role: {
    type: Number,
    default: 0
  },
  registrationDate: { type: Date, default: Date.now() },
});



const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;