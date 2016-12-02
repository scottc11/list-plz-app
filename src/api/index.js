'use strict'

// THIS IS THE API module

var express = require('express');
var User = require('../models/userSchema.js');


// defining a router to prefix things with the '/api' namespace
var router = express.Router();


//  NOTE: for some reason, the file extension can/needs to be excluded in the GET request
router.get('/list', function(req, res) {

  // getting the data from database via mongoose model (models/list.js)
  User.find({}, function(err, user) {
    if (err) {
      return res.status(500).json({message: err.message});
    } else {
      res.json( { user: user } );
    }
  });

});

// NOTE: GETTING specific user data.  Keep in mind that it always returns an Array, with all the matching object in that array.  Meaning, if there is only one matching object, you still have to select it with an index, then the following object keys
router.get('/list/:id', function(req, res) {
  var id = req.params.id;
  User.find( { _id: id } , function(err, user) {
    if (err) {
      return res.status(500).json({message: err.message});
    } else {
      res.json( { user: user } );
    }
  });

});

// ----------------------------------------------------------------
// NOTE: POST route to create new list entries
router.post('/list', function(req, res) {
  var item = req.body;
  User.create(item, function(err, item) {
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
  var userId = req.params.id;  // Params is the extra stuff attached to url (ie. mysite.com/list/:myParameter)
  var item = req.body;

  console.log('id', userId);
  console.log('item id', item._id);
  console.log('item body', item);
  // NOTE: put this block once wishlist has been located
  // IF there is an item from request, and that item matches the request _ID
  // if (item && item._id !== id) {
  //   return res.status(500).json({err: "IDs don't match!"});
  // }

  // Find the users list item and update it
  User.findOneAndUpdate({_id: item._id}, {$set:item}, {upsert: true, new: true}, function(err, data) {

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
