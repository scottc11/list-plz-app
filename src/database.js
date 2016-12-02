'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/listpls3', function(err) {
  if(err) {
    console.log('Failed connecting to Mongodb! -sc');
  } else {
    console.log('Successfully conected to mongodb!');
  }
});
