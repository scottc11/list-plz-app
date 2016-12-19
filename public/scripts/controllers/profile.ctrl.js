'use strict';

angular.module('listPlz')
  .controller('profileCtrl', function($location, dataService) {
    var vm = this;

    vm.user = {};
    vm.users = [];
    vm.wishlistGroup = {};

    vm.bgClassArray = ['bg-color-red', 'bg-color-pink', 'bg-color-light-blue', 'bg-color-light-peach', 'bg-color-yellow'];

    dataService.getProfile()

      .then(function(userData) {
        vm.user = userData;
      }, function (error) {console.log(error);})

      // get wishlist data
      .then(function() {
        dataService.getWishlistGroup(vm.user.groupId).then(function(response) {
          vm.wishlistGroup = response.group;
        });
      }, function (error) {console.log(error);})

      // get group users info with a .find by groupID
      .then(function() {
        dataService.getUsersWithGroupId(vm.user.groupId)
        .then(
          function(response) {
            vm.users = response;
            console.log(vm.users);
          }
        )
      });

  });

// NOTE: this contoller successfully gets and recieves user data from the API
// based off of the current json web token found in the browsers local storage.
// It uses the api route "/api/auth/profile"
