'use strict'

// THIS IS THE API module

var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('express-jwt');


var User = require('../models/userSchema.js');
var Group = require('../models/groupSchema.js');

// for authentication
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'  // default name would be userProperty: 'user' -- but that is our mongoose model name so we use payload instead
});

// defining a router to prefix things with the '/api' namespace
var router = express.Router();

router.get('/groups/', function(req, res) {

  // getting the data from database via mongoose model (models/groupSchema.js)
  Group.find({}, function(err, groupsArray) {
    if (err) {
      return res.status(500).json({message: err.message});
    } else {
      res.json( { groups: groupsArray } );
    }
  });
});


router.get('/list/', function(req, res) {

  // getting the data from database via mongoose model (models/userSchema.js)
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
router.get('/list/:userId', function(req, res) {
  var id = req.params.userId;
  User.findOne({ _id: id } , function(err, user) {
    if (err) {
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

  // NOTE: Model.findOneAndUpdate(conditions, update, options, callback)
  User.findOneAndUpdate(
    { _id: userId, "wishlist._id": item._id },
    { $set: { "wishlist.$": item } }, // The '$' operator is a 'positional' mongoDB operator, which holds the 'matched' position in the array. NOTE: Must be in quotes! or it wont compile.
    { new: true },

    function(err, data) {
      if (err) {
        return res.status(500).json({err: err.message});
      }
      console.log('Saved edited Item to DB');
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



  // CREATING GROUP ------ CREATING GROUP ------ CREATING GROUP ------ CREATING GROUP
  if (req.body.groupOption === "CREATE") {
    var group = new Group();


    var user = new User();

    user.userInfo.name = req.body.name;
    user.userInfo.email = req.body.email;
    user.groupId = group._id;
    user.setPassword(req.body.password);

    user.save(function(err) {
      if (err) {
        console.log("new user couldn't be saved ", err);
      }
      console.log('*** New User: ', user.userInfo.name, ' was created in DB');
    })

    .then(function() {
      group.name = req.body.groupName;
      group.userIds.push(user._id);
      group.generateGroupCode();

      // See groupSchema.js file to view this methods code.
      group.validateGroupCode(function() {

        group.save(function(err) {
          if (err) {
            return res.status(500).json({err: err.message});
          } else {
            console.log('*** Group with group code: ', group.groupCode, ' was created and added to DB');
            var token;
            token = user.generateJwt();
            return res.status(201).json({'token': token, 'group': group, 'user': user});
          }
        });
      });
    });


  }


  // JOINING GROUP ------ JOINING GROUP ------ JOINING GROUP ------ JOINING GROUP
  else if (req.body.groupOption === "JOIN") {
    var group;

    Group.findOne({groupCode: req.body.groupCode}, function(err, _group) {
      if (_group == null) {
        console.log('group does not exist');
      } else {
        group = _group;
      }

    }).then(function() {
      var user = new User();

      user.userInfo.name = req.body.name;
      user.userInfo.email = req.body.email;
      user.groupId = group._id;
      user.groupCode = req.body.groupCode;
      user.setPassword(req.body.password);

      user.save(function(err) {
        if (err) {
          console.log("new user couldn't be saved ", err);
        }
        console.log('*** New User: ', user.userInfo.name, ' was created in DB');
      })

      .then(function() {
        group.userIds.push(user._id);
        group.save(function(err) {
          if (err) {
            return res.status(500).json({err: err.message});
          } else {
            console.log('*** Group with group code: ', group.groupCode, ' was UPDATED in the DB');
            var token;
            token = user.generateJwt();
            return res.status(201).json({'token': token, 'group': group, 'user': user});
          }
        });
      });
    });
  }


});


// --------------------------------------------------------------------------------
// NOTE: GET all the groupCodes to check for duplicates

router.get('/auth/validateGroupCode/:groupCode', function(req, res) {
  var _groupCode = req.params.groupCode;
  Group.find({ 'groupCode': _groupCode }, function(err, data) {
    // error
    if (err) {
      return res.status(500).json({err: err.message});
    } else {
      // Group Exists
      if (data.length >= 1) {
        return res.status(200).json({ groupCode: _groupCode });
      }
      // Group does not exist
      if ( data.length === 0 ) {
        return res.status(202).json({ groupCode: _groupCode });
      }
    }
  });
});


// --------------------------------------------------------------------------------
// NOTE: CREATE a new group in database

router.post('/auth/createGroup', function(req, res) {

  var userId = '5840a4c242fa665ee7248182';
  var testCode = '5wcx0';

  var group = new Group();

  group.name = "MyGroupName";
  group.userIds.push(userId);
  group.generateGroupCode();
  // group.groupCode = testCode;

  // See groupSchema.js file to view this methods code.
  group.validateGroupCode(function() {

    group.save(function(err) {
      if (err) {
        return res.status(500).json({err: err.message});
      } else {
        console.log('*** Group with group code: ', group.groupCode, ' was created and added to DB');
        return res.status(201).json({'group': group});
      }
    });
  });



});

// --------------------------------------------------------------------------------
// NOTE: GET an existing group from database

router.get('/auth/group/:groupCode', function(req, res) {
  var _groupCode = req.params.groupCode;
  Group.find({_id: _groupCode}, function(err, data) {
    res.json({group: data});
  })
});


// --------------------------------------------------------------------------------
// NOTE: /api/login (POST) – to handle returning users logging in
// NOTE: Passport.authenticate passes some variables call err, user, and info into the next function(req, res){}
//       Passport configuration found in "/config/passport.js"
router.post('/auth/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var token;

    // error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // if a user is foound
    if (user) {
      console.log("There was a user found!!!!");
      token = user.generateJwt();
      res.status(200);
      res.json({'token': token});
    }
    // if no user is found
    else {
      res.status(401).json(info);
    }
  })(req, res, next);
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
