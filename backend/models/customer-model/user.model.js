const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 10,
    max: 10,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 4,
  },
  address: {
    type: String,
  },
  profilePic: {
    type: String,
    trim: true,
  },
  mobileVarify: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  firstOrder: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  otp: {
    type: String,
    default: "",
  },
  isLoggedIn:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("customer", customerSchema);
