//Dependencies
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const postController = require("./controllers/post_controller.js")
const db = mongoose.connection;
require('dotenv').config()

//Config
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI; //connect to database

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middleware
app.use(express.static('public'));
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.use("/posts", postController)



//Listener
app.listen(PORT, () => console.log( 'Listening for Project 2 on port:', PORT));
// Connect to Mongo & Fix Depreciation Warnings from Mongoose
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
() => {
  console.log("connected to mongod");
}
);
