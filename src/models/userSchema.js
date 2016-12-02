'use strict';

var mongoose = require('mongoose');

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
    lastName: String
  },
  wishlist: [ ItemSchema ]
});

var model = mongoose.model('User', userSchema);

module.exports = model;
