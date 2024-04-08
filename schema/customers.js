const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  profileImage: String, 
  phoneNumber:String,
  bio:String,
  passwordHash: String, 
  role: {
    type: Number,
    default: 0
  },
  verified:{type:Boolean, default: false},
  registrationDate: { type: Date, default: Date.now() },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
});



const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;