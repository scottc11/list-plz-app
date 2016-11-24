'use strict'

// THIS IS THE API module

var express = require('express');
var list = require('../../mock/list.json') // our mock data



// defining a router to prefix things with the '/api' namespace
var router = express.Router();



router.get('/list', function(req, res) {
  res.json({list: list});
});


// TODO: Add POST route to create new list entries


// TODO: add PUT route to update existing list entries


// TODO: Add DELETE route to delete list entries


module.exports = router;
