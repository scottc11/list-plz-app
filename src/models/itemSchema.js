'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  details: String,
  url: String,
  purchased: Boolean
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
