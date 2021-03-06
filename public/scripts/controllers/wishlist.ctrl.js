'use strict';

angular.module('listPlz')
  .controller('wishlistCtrl', function($scope, $location, dataService, authService) {
    var vm = this;

    vm.user = authService.currentUser();

    // GET THE WISH LIST DATA FROM api
    dataService.getWishlist(vm.user._id, function(response) {
      $scope.userObject = response.data.user;
      $scope.userInfo = response.data.user.userInfo;
      $scope.wishlist = response.data.user.wishlist;
      $scope.userFirstName = response.data.user.userInfo.name.split(' ')[0];
    });


    $scope.addItem = function() {
      var item = {
        name: "click to edit",
        purchased: false,
        details: "",
        url: ""
      };
      $scope.wishlist.unshift(item);  // pushes new item to the 'top/front' of the list
    }

    $scope.deleteItem = function(item, $index) {

      var userObjectId = $scope.userObject._id;
      var itemToDelete = item;

      dataService.deleteItem(userObjectId, itemToDelete);
      $scope.wishlist.splice($index, 1);
    };

    $scope.saveItem = function() {

      var userObjectId = $scope.userObject._id;

      // Get all items that have been edited and put them in array
      var itemsToSave = $scope.wishlist.filter(function(item) {
        if (item.edited) {
          return item;
        }
      });
      dataService.saveItem(userObjectId, itemsToSave).finally($scope.resetItemState());
    };

    // reset all items with edited == true to edited == false
    $scope.resetItemState = function() {
      $scope.wishlist.forEach(function(item) {
        item.edited = false;
      });
    }

  });
