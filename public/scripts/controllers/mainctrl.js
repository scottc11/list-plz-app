'use strict';

angular.module('listPlz')

.controller('mainCtrl', function($scope, dataService) {


  // GET THE WISH LIST DATA FROM api
  dataService.getWishlist(function(response) {
    console.log(response.data);
    $scope.user = response.data.list['user'];
    $scope.wishlist = response.data.list['wishlist'];
  });

  $scope.addItem = function() {
    var item = {
      "name": "click to edit",
      "details": "",
      "url": ""
    };
    $scope.wishlist.unshift(item);  // pushes new item to the 'top' of the list
  }

  $scope.deleteItem = function(item, $index) {
    dataService.deleteItem(item);
    $scope.wishlist.splice($index, 1);
  };

  $scope.saveItem = function(item, $index) {
    dataService.saveItem(item);
  };

  // TODO:
  // when ('add new' button clicked)
  //    add new item to list and init it with 'editing' == true
  // if (new item name == empty)
  //    display holder text of "click to edit"


});
