'use strict';

angular.module('listPlz')

.controller('mainCtrl', function($scope, dataService) {

  console.log('dataService', dataService);
  // GET THE WISH LIST DATA FROM api
  dataService.getWishlist(function(response) {
    console.log(response.data);
    $scope.userObject = response.data.user[0];
    $scope.userInfo = response.data.user[0]['userInfo'];
    $scope.wishlist = response.data.user[0]['wishlist'];
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


  // TODO: Only show delete button after item has been saved to db - or
  // deal with a method to delete a newly created item BEFORE it gets saved to db.

  // TODO:
  // when ('add new' button clicked)
  //    add new item to list and init it with 'editing' == true
  // if (new item name == empty)
  //    display holder text of "click to edit"

  // TODO: add a template for the header/navbar using ng-include

});
