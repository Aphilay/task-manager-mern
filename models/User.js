// This file contains the model for type User
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema for User
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

// Export the UserSchema to be used by routes/api/users or other files
module.exports = Item = mongoose.model("user", UserSchema);
