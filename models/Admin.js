const mongoose = require("mongoose");

import { isEmail } from "validator";
const AdminSchema = new mongoose.Schema({
  profile_picture: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please add email"],
    unique: [true, "Email already available"],
    validate: [isEmail, "invalid email"],
  },
  username: {
    type: String,
    required: [true, "Please add username"],
    unique: [true, "Username already available"],
  },
  gender: {
    trim: true,
    type: String,
    enum: ["Male", "Female"],
    required: [true, "Gender is required"],
  },
  birthday: {
    type: Date,
    required: true,
    trim: true,
  },
  mobile: {
    trim: true,
    type: String,
    unique: [true, "Mobile Number already available"],
    required: [true, "Mobile Number is required"],
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password too short"],
  },
});

module.exports = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
