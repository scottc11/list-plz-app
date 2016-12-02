'use strict';

var mongoose = require('mongoose');

var wishlistSchema = new mongoose.Schema({
  wishlist: [{
    name: String,
    details: String,
    url: String,
    purchased: Boolean
  }]
});

var model = mongoose.model('User', userSchema);

module.exports = model;
