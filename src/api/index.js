'use strict'

// THIS IS THE API module

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('express-jwt');


var User = require('../models/userSchema.js');

// for authentication
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'  // default name would be userProperty: 'user' -- but that is our mongoose model name so we use payload instead
});

// defining a router to prefix things with the '/api' namespace
var router = express.Router();



//  NOTE: for some reason, the file extension can/needs to be excluded in the GET request
router.get('/list', function(req, res) {

  // getting the data from database via mongoose model (models/list.js)
  User.find({}, function(err, user) {
    if (err) {
      console.log('going to get./list');
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
      console.log('going to get./list/:id');
      return res.status(500).json({message: err.message});
    } else {
      res.json( { user: user } );
    }
  });

});



// ----------------------------------------------------------------
// NOTE: POST route to create new list entries by using the mongoose.model.push method which pushes a new 'item' sub-model to the 'user' parent models 'wishlist', and then saves the parent to the database.
router.post('/list/:userId', function(req, res) {
  var userId = req.params.userId
  var item = req.body;

  User.findOne({'_id': userId}, function(err, data) {
    if (err) {
      console.log('going to post./list/:userId');
      return res.status(500).json({err: err.message});
    }

    data.wishlist.push(item);
    data.save(function(err) {
      if (err) {
        return res.status(500).json({err: err.message});
      }
      res.json({'wishlist': data});
      console.log("new Item " + item + " was saved to the db");

    })
  });
});


// ----------------------------------------------------------------
// NOTE: PUT route to update existing list entries

router.put('/list/:id', function(req, res) {
  var userId = req.params.id;  // Params is the extra stuff attached to url (ie. mysite.com/list/:myParameter)
  var item = req.body;
  console.log("got the request body");

  // NOTE: Model.findOneAndUpdate(conditions, update, options, callback)
  User.findOneAndUpdate(
    { _id: userId, "wishlist._id": item._id },
    { $set: { "wishlist.$": item } }, // The '$' operator is a 'positional' mongoDB operator, which holds the 'matched' position in the array. NOTE: Must be in quotes! or it wont compile.
    { new: true },

    function(err, data) {
      if (err) {
        console.log('its happening here');
        return res.status(500).json({err: err.message});
      }
      res.json({'wishlist': data});
    }
  );

});


// ----------------------------------------------------------------
// NOTE: DELETE route to delete list entries

router.delete('/list/:userId', function(req, res) {
  var userId = req.params.userId;
  var itemId = req.query.itemId;

  User.findOne({'_id': userId}, function(err, data) {

    if (err) {
      console.log('going to delete./list/:userId');
      return res.status(500).json({err: err.message});
    }

    data.wishlist.id(itemId).remove();
    data.save(function(err) {
      if (err) {
        return res.status(500).json({err: err.message});
      } else {
        console.log("Item with ID '" + itemId + "' was deleted from the db");
      }
    });

  });
});


// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
//         AUTHENTICATION              AUTHENTICATION               AUTHENTICATION
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
/*
1) take the data from the submitted form and create a new Mongoose model instance
2) Call the setPassword method we created earlier to add the salt and the hash to the instance
3) Save the instance as a record to the database
4) Generate a JWT
5) Send the JWT inside the JSON response
*/
// TODO: Profile GET route should be fleshed out with some more error trapping – for example if the user isn’t found


// NOTE: /api/register (POST) – to handle new users registering
router.post('/auth/register', function(req, res) {
  console.log(req.body);
  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }


  var user = new User();

  user.userInfo.name = req.body.name;
  user.userInfo.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {

    if (err) {
      console.log("new user couldn't be saved ", err);
    }

    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
});

// --------------------------------------------------------------------------------
// NOTE: /api/login (POST) – to handle returning users logging in
router.post('/auth/login', function(req, res) {

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

});

// --------------------------------------------------------------------------------
// NOTE: /api/profile/USERID (GET) – to return profile details when given a USERID
// TODO: this should be fleshed out with some more error trapping – for example if the user isn’t found
router.get('/auth/profile', auth, function(req, res) {
  
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

});






module.exports = router;
