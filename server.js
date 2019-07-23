const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI'); // delete keys.js

// Connect to Mongo
mongoose
    .connect(db,{ useNewUrlParser: true,
    useCreateIndex: true }) //useCreateIndex gets rid of Mongoose deprecation warning
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static asssets (build folder), if we're in production
if(process.env.NODE_ENV == 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

// Connect to server, define port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));