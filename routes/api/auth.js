// This file will authenticate a user
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config"); //need jwt secret
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post("/", (req, res) => {
  const { email, password } = req.body; //destructuring

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // Validate password using bcrypt (compare function)
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      // If correct login, send token and the user, just like registration
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

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
// This route gets current users data by using token, JWT auth is stateless
// unlike sessions which stores auth data in memory on server where you send token, decodes it, sends back response.
// auth middleware protects this route
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password") // disregard password
    .then(user => res.json(user));
});

module.exports = router;
