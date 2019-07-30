// This file contains the model for type Item
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// This is the schema for an Item
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the ItemSchema to give access to routes/api/items or other files
module.exports = Item = mongoose.model("item", ItemSchema);
