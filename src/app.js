'use strict';
// --------------------------------------------------------------
// EXPRESS APPLICATION FILE
// --------------------------------------------------------------


var express = require('express');  //requiring express module
var parser = require('body-parser');
var router = require('./api');  // require router from '/api/index.js'
var passport = require('passport');

var app = express();  // assigning an instance of express()

// DATABASE stuff
require('dotenv').config();  //Use a .env file to create variables specific to the current enviroment the app is running in
require('./database');
require('./seed');
require('./config/passport');

// passing in the 'middleware' in public folder this line is linking to the public folder so that all url/http requests that start with a '/' will be rooted to the 'public' folder.  'index.html' is displayed by default in the browser
app.use('/', express.static('public'));
app.use(parser.json());
app.use(passport.initialize());
// app.use(passport.session());

app.use('/api', router);


// error handlers
// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});


app.listen(process.env.PORT || 3000, function() {
  if (process.env.PORT) {
    console.log("The server is running on Heroku");
  } else {
    console.log("The server is running Locally on port 3000!");
  }

});
