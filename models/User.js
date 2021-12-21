const mongoose = require("mongoose");

import { isEmail } from "validator";
const UserSchema = new mongoose.Schema({
  profile_picture: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please add email "],
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
    required: [true, "Gender"],
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password too short"],
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
