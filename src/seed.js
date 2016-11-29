'use strict';

var List = require('./models/list.js');

var seedData = require('../mock/list.json');
// console.log(seedData);

var testData = ['feed the dog', 'walk the kids', 'water the trees'];

seedData.forEach(function(object, index) {
  // console.log(object.user.firstName);
  // console.log(object.wishlist);
  List.find( { user: object.user }, function(err, seedData) {
    if (!err && !seedData.length) {
      List.create( { user: object.user, wishlist: object.wishlist } );
    } else {
      console.log('Seed data was not created in seed.js');
    };
  });
});


// List.find({'user': {'firstName': object.user.firstName}}, function(err, todos) {
//   if (!err && !seedData.length) {
//     List.create({user: object.user, wishlist: object.wishlist});
//   }
// });
