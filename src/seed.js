'use strict';

var User = require('./models/userSchema.js');

// some data to get things rolling
var seedData = require('../mock/seedData.json');

seedData.forEach(function(object, index) {

  // if seedData values already exists in DB, don't seed them!
  User.find( { userInfo: object.userInfo }, function(err, seedData) {
    if (!err && !seedData.length) {
      User.create( { userInfo: object.userInfo, wishlist: object.wishlist } );
    } else {
      console.log('Seed data was not created in seed.js');
    };
  });
});
