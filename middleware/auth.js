// This file is middleware to have allow access to private routes only if token is obtained
const config = require("config");
const jwt = require("jsonwebtoken");

// Middleware function, Get the token from the front end
// Middleware function takes 3 args
function auth(req, res, next) {
  // Fetch from header, this is the header value we want to check from token
  const token = req.header("x-auth-token");

  // Check for token (x-auth-token)
  // 401 status = unauthorized
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" }); //401 = user is unauthorized

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Take user from the token, and put it into req.user. So whenever token is sent, we have user stored in request value.
    // Add user from payload
    req.user = decoded;
    next(); // calls next piece of middleware
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
