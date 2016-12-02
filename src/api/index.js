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
router.post('/list/:userId', function(req, res) {
  var userId = req.params.userId
  var item = req.body;

  User.findOne({'_id': userId}, function(err, data) {
    if (err) {
      return res.status(500).json({err: err.message});
    }

    data.wishlist.push(item);
    data.save(function(err) {
      if (err) {
        return res.status(500).json({err: err.message});
      } else {
        console.log("new Item " + item + " was saved to the db");
      }
    })
  });
});


// ----------------------------------------------------------------
// NOTE: PUT route to update existing list entries

router.put('/list/:id', function(req, res) {
  var userId = req.params.id;  // Params is the extra stuff attached to url (ie. mysite.com/list/:myParameter)
  var item = req.body;


  // NOTE: Model.findOneAndUpdate(conditions, update, options, callback)
  User.findOneAndUpdate(
    { _id: userId, "wishlist._id": item._id },
    { $set: { "wishlist.$": item } }, // The '$' operator is a 'positional' mongoDB operator, which holds the 'matched' position in the array
    { new: true },

    function(err, data) {
      if (err) {
        return res.status(500).json({err: err.message});
      }
      res.json({'wishlist': data});
    }
  );

});


// ----------------------------------------------------------------
// TODO: Add DELETE route to delete list entries


module.exports = router;
