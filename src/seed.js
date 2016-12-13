'use strict';

var User = require('./models/userSchema.js');
var Group = require('./models/groupSchema.js');

// some data to get things rolling
var seedData = require('../mock/seedData.json');
var groupSeedData = require('../mock/groupSeedData.json');

seedData.forEach(function(object, index) {

  // if seedData values already exists in DB, don't seed them!
  User.find( { userInfo: object.userInfo }, function(err, seedData) {
    if (!err && !seedData.length) {
      User.create( {
        userInfo: {
          userName: object.userInfo.userName,
          firstName: object.userInfo.firstName,
          lastName: object.userInfo.lastName
        },
        wishlist: object.wishlist
      }
    );
    } else {
      console.log('Seed data was not created in seed.js');
    };
  });
});

groupSeedData.forEach(function(object, index) {
  Group.find({ groupCode: object.groupCode }, function(err, groupSeedData) {
    if (err) {
      console.log(err);
    }
    if (!err && !groupSeedData.length) {

      Group.create(
        {
          name: object.name,
          userIds: object.userIds,
          groupCode: object.groupCode
        }
      );
      console.log('created group via seed data');
    } else {
      console.log('Group seed data was not created in seed.js');
    }
  });
});
