'use strict';

var express = require('express');  //requiring express module

var app = express();  // assigning an instance of express()

// passing in the 'middleware' in public folder
app.use('/', express.static('public'));

// defining a router to prefix things with the '/api' namespace
var router = express.Router();



router.get('/todos', function(req, res) {
  res.send('These are the todos!');
});


// TODO: Add POST route to create new list entries


// TODO: add PUT route to update existing list entries


// TODO: Add DELETE route to delete list entries


app.use('/api', router);

app.listen(3000, function() {
  console.log("The server is running on port 3000!");
});
