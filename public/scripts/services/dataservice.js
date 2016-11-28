'use strict';

angular.module('listPlz')

.service('dataService', function($http) {

  // THIS IS WHERE THE SERVICE WILL CONNECT WITH DATA API
  this.getWishlist = function(callback) {
    $http.get('/api/list').then(callback)
  }

  this.deleteItem = function(item) {
    console.log("The " + item.name + " item has been deleted!");
    // other logic
  }

  this.saveItem = function(item) {
    console.log("The " + item.name + " item has been saved!");
    // other logic
  }

});
