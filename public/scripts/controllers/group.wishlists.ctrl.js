'use strict';

angular.module('listPlz')
  .controller('wishlistsCtrl', function($location, $rootScope, dataService) {

    var vm = this;

    $rootScope.appBackground = "bg-color-dark-grey"

    vm.user = {}; // the actual logged in user
    vm.users = [];
    vm.selectedUser = {}; // the displayed wishlists corrosponding user object
    vm.wishlistGroup = {};
    vm.listVisible = false;

    vm.show = function() {
      vm.listVisible = !vm.listVisible;
    }

    vm.select = function(user) {
      vm.selectedUser = user;
      vm.listVisible = false;
    }

    vm.savePurchasedItems = function() {
      var userObjectId = vm.selectedUser._id;

      // Get all items that have been edited and put them in array
      var itemsToSave = vm.selectedUser.wishlist.filter(function(item) {
        if (item.purchased) {
          return item;
        }
      });
      dataService.saveItem(userObjectId, itemsToSave);
    }

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
            vm.selectedUser = vm.users[0];
            console.log(vm.users);
            console.log(vm.selectedUser);
          }
        )
      });

  });

// NOTE: this contoller successfully gets and recieves user data from the API
// based off of the current json web token found in the browsers local storage.
// It uses the api route "/api/auth/profile"
