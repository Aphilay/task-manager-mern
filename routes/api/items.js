// This file contains the API endpoints for an Item. GET, POST, DELETE
const express = require("express");
const router = express.Router(); // Router is a part of the express object
const auth = require("../../middleware/auth");

//Bring in the Item Model
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
  Item.find() // Mongoose has a find method
    .sort({ date: -1 }) // -1 = descending, 1 = ascending
    .then(items => res.json(items));
});

// @route   POST api/items
// @desc    Create an Item
// @access  Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name // bodyParser allows us to retrieve name from request
  });
  newItem.save().then(item => res.json(item)); // call .save() to db then spit out saved item in json
});

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id) // findById(), available by mongoose
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// ES6 version using babel, "export default router";
module.exports = router;
