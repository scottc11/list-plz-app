'use strict';

var mongoose = require('mongoose');

// var todoSchema = new mongoose.Schema({
// 	name: String,
// 	completed: Boolean
// });

var listSchema = new mongoose.Schema({
  user: {
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

var model = mongoose.model('List', listSchema);

module.exports = model;
