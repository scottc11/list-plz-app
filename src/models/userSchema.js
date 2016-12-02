'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  userInfo: {
    userName: String,
    firstName: String,
    lastName: String
  },
  wishlist: [{
    name: String,
    details: String,
    url: String,
    purchased: Boolean
  }]
});

var model = mongoose.model('User', userSchema);

module.exports = model;
