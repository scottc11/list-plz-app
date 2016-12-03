
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');


// defining a router to prefix things with the '/api' namespace
var router = express.Router();

// --------------------------------------------------------------------------------
// TODO: /api/register (POST) – to handle new users registering
router.post('/list/register' function(req, res) {
  var user = new User();

  user.userInfo.name = req.body.name;
  user.userInfo.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
});

// --------------------------------------------------------------------------------
// TODO: /api/login (POST) – to handle returning users logging in


// --------------------------------------------------------------------------------
// TODO: /api/profile/USERID (GET) – to return profile details when given a USERID



/*
1) take the data from the submitted form and create a new Mongoose model instance
2) Call the setPassword method we created earlier to add the salt and the hash to the instance
3) Save the instance as a record to the database
4) Generate a JWT
5) Send the JWT inside the JSON response
*/

module.exports = router;
