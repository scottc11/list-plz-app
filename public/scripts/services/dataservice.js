'use strict';

angular.module('listPlz')

.service('dataService', function($http, $q, authService) {

  // THIS IS WHERE THE SERVICE WILL CONNECT WITH DATA API
  this.getWishlist = function(userId, callback) {
    $http.get('/api/list/' + userId).then(callback)
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

  this.getProfile = function() {
    return $http.get('/api/auth/profile/', {
      headers: {
        Authorization: 'Bearer ' + authService.getToken()  // This is a OAuth 2.0 bearer token. -- WebServer specific
      }
    }).then(
      function(response){
        return response.data;
      },
      function(error){
        console.log(error);
      });
  };

  this.getWishlistGroup = function(_id) {
    return $http.get('/api/auth/group/' + _id)
      .then(
        function(response){
          return response.data;
        },
        function(error){console.log(error)}
      );
  };

  this.getUsersWithGroupId = function(groupId) {
    return $http.get('api/group/users/' + groupId)
      .then(
        function(response) {
          return response.data.users;
        },
        function(error){console.log(error)}
      );
  };

});
