'use strict'

// THIS IS THE API module

var express = require('express');
var List = require('../models/list.js');


// defining a router to prefix things with the '/api' namespace
var router = express.Router();


//  NOTE: for some reason, the file extension can/needs to be excluded in the GET request
router.get('/list', function(req, res) {

  // getting the data from database via mongoose model (models/list.js)
  List.find({}, function(err, list) {
    if (err) {
      return res.status(500).json({message: err.message});
    } else {
      res.json({list: list});
    }
  });

});


// ----------------------------------------------------------------
// NOTE: POST route to create new list entries
router.post('/list', function(req, res) {
  var item = req.body;
  List.create(item, function(err, item) {
    if (err) {
      return res.status(500).json({err: err.message});
    } else {
      res.json({'user': item.user, 'wishlist': item.wishlist });
    }
  });
});


// ----------------------------------------------------------------
// NOTE: PUT route to update existing list entries
// added a parameter called 'id' to the url string
router.put('/list/:id', function(req, res) {
  var id = req.params.id;
  var item = req.body;

  console.log('id', id);
  console.log('item id', item._id);
  console.log('item', item);
  // IF there is an item from request, and that item matches the request _ID
  if (item && item._id !== id) {
    return res.status(500).json({err: "Ids don't match!"});
  }
  // create listItem schema and remove
  List.findOneAndUpdate({_id: id}, {$set:item}, {new: true}, function(err, data) {

    if (err) {
      return res.status(500).json({err: err.message});
    }
    console.log("made it");
    console.log('error', err, 'data', data);
    res.json({ 'item': data });

  });

});


// ----------------------------------------------------------------
// TODO: Add DELETE route to delete list entries


module.exports = router;
