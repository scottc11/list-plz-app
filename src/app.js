'use strict';

var express = require('express');  //requiring express module
var router = require('./api');  // require router from '/api/index.js'

var app = express();  // assigning an instance of express()

// passing in the 'middleware' in public folder
// this line is linking to the public folder so that all
// url/http requests that start with a '/' will be rooted to
// the 'public' folder.  'index.html' is displayed by default
// in the browser
app.use('/', express.static('public'));


app.use('/api', router);

app.listen(3000, function() {
  console.log("The server is running on port 3000!");
});
