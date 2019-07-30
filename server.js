const express = require("express"); // B.E. framework
const mongoose = require("mongoose"); // ORM to interact with MongoDB database
const path = require("path");
const config = require("config");

const app = express(); //Init express into a variable 'app'

// Bodyparser Middleware is included in express
app.use(express.json());

// DB Config to get the mongoURI constant
const db = config.get("mongoURI");

// Connect to Mongo using mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true }) //useCreateIndex gets rid of Mongoose deprecation warning
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes, all endpoints will point to these files
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// When in production, look at the client/build folder.
// When npm run build, everything goes into client/build folder and looks at the index.html file, because we do not have a Dev Server when in production
if (process.env.NODE_ENV == "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Connect to server, define port. Use process.env.PORT for heroku (enviromental variable)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
