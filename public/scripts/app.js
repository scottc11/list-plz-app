'use strict'

angular.module('listPlz', [])
  .controller('mainCtrl', function($scope, dataService) {


    $scope.helloWorld = function() {
      console.log("hello there! This is the hello world controller function in the main controller");
    };

    // GET THE WISH LIST DATA FROM api
    dataService.getWishList(function(response) {
      console.log(response.data);
      $scope.wishList = response.data;
    });

    $scope.addItem = function() {
      var item = {"name": "This is a new todo"};
      $scope.wishList.push(item);
    }

    $scope.deleteItem = function(item, $index) {
      dataService.deleteItem(item);
      $scope.wishList.splice($index, 1);
    };

    $scope.saveItem = function(item, $index) {
      dataService.saveItem(item);
    };

  })
  .service('dataService', function($http) {

    // THIS IS WHERE THE SERVICE WILL CONNECT WITH DATA API
    this.getWishList = function(callback) {
      $http.get('mock/list.json').then(callback)
    }

    this.deleteItem = function(item) {
      console.log("The" + item.name + " item has been deleted!");
      // other logic
    }

    this.saveItem = function(item) {
      console.log("The" + item.name + " item has been saved!");
    }

  });

// TODO: add strike-through when item.purchased is == true
// TODO: create an ng-model="item.purchased" and attach
// it to the <input type="checkbox"> html.  This will be used
// mark a users item as 'purchased' by setting item.purchased to 'true'
