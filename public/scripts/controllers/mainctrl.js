'use strict';

angular.module('listPlz')

.controller('mainCtrl', function($scope, dataService) {


  // GET THE WISH LIST DATA FROM api
  dataService.getWishlist(function(response) {
    console.log(response.data);
    $scope.user = response.data['user'];
    $scope.wishlist = response.data['wishlist'];
  });

  $scope.addItem = function() {
    var item = {"name": "This is a new item"};
    $scope.wishlist.push(item);
  }

  $scope.deleteItem = function(item, $index) {
    dataService.deleteItem(item);
    $scope.wishlist.splice($index, 1);
  };

  $scope.saveItem = function(item, $index) {
    dataService.saveItem(item);
  };

});
