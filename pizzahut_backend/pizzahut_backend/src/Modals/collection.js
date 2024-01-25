const mongoose = require("mongoose");
const validator = require("validator");

const registerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
});

//We will Create a new Collections
const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;
