// This file contains routes for a user to register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config"); //to use jwt secret
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body; //destructuring

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  // findOne method is a mongoose method
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    // if user does not exist, create new user object
    const newUser = new User({
      name,
      email,
      password
    });

    // Create salt & hash using bcryptjs module
    // Salt is used to create a password hash from a plaintext password
    // 10 is the number of rounds used, the higher the more secure, but it takes longer, 10 is the default
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          // Create JWT, takes 3-4 parameters, payload, jwt secret value, expiration time(optional), 3600 seconds (1hr), callback(async)
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
