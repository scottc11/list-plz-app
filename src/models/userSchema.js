'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');  // for user auth. Node module
var jwt = require('jsonwebtoken'); // npm json-webtoken


var ItemSchema = new mongoose.Schema({
  name: String,
  details: String,
  url: String,
  purchased: Boolean
});

var userSchema = new mongoose.Schema({
  userInfo: {
    userName: String,
    firstName: String,
    lastName: String,
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    hash: String,
    salt: String
  },
  wishlist: [ ItemSchema ],
  groupId: String,
  groupCode: String
});


// To save the reference to the password we can create a new method called setPassword on the userSchema schema that accepts a password parameter. The method will then use crypto.randomBytes to set the salt, and crypto.pbkdf2Sync to set the hash.
// NOTE: We’ll use this method when creating a user
userSchema.methods.setPassword = function(password){
  this.userInfo.salt = crypto.randomBytes(16).toString('hex');
  this.userInfo.hash = crypto.pbkdf2Sync(password, this.userInfo.salt, 1000, 64).toString('hex');
};



// NOTE: Checking the password by encrypting the salt and the password to see if the output matches the stored hash
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.userInfo.salt, 1000, 64).toString('hex');
  return this.userInfo.hash === hash;
};



// NOTE: generate and return a JWT as a javascript object
userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.userInfo.email,
    name: this.userInfo.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


var model = mongoose.model('User', userSchema);

module.exports = model;
