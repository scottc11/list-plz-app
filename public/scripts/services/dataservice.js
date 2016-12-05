'use strict';

angular.module('listPlz')

.service('dataService', function($http, $q, authService) {

  // THIS IS WHERE THE SERVICE WILL CONNECT WITH DATA API
  this.getWishlist = function(callback) {
    $http.get('/api/list').then(callback)
  }



  this.deleteItem = function(userObjectId, itemToDelete) {
    var request;

    if (!itemToDelete._id) {
      return console.log('Can not delete Item because it has no id.');
    } else {
      request = $http.delete('/api/list/' + userObjectId, {params: { 'itemId': itemToDelete._id }} );
    }
  }



  // Saving new items.  NOTE: using the $q ('ie. queue') parameter in service
  this.saveItem = function(userObjectId, itemsToSave) {
    var queue = [];

    // loop through each item/user and push each 'request' to the queue array
    itemsToSave.forEach(function(item) {
      var request;
      if (!item._id) { // if item has no id, POST the item to database
        console.log("Item has no ID stage");
        request = $http.post('/api/list/' + userObjectId, item);
      } else {
        request = $http.put('/api/list/' + userObjectId, item).then(function(result) {

          // item = result.data.item;
          item = result.config.data;

          return item;
        });
      }
      queue.push(request);
    });

    // $q.all resolves all promises before returning results
    return $q.all(queue).then(function(results) {
      console.log("I saved " + itemsToSave.length + " items!");
    });
  }

  var getProfile = function () {
    return $http.get('/api/profile', {
      headers: {
        Authorization: 'Bearer ' + authService.getToken()
      }
    });
  };

  //NOTE: careful with this return statement
  return {
    getProfile : getProfile
  };


});
