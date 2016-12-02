'use strict';

angular.module('listPlz')

.service('dataService', function($http, $q) {

  // THIS IS WHERE THE SERVICE WILL CONNECT WITH DATA API
  this.getWishlist = function(callback) {
    $http.get('/api/list').then(callback)
  }

  this.deleteItem = function(item) {
    console.log("The " + item.name + " item has been deleted!");
    // other logic
  }

  // Saving new items.  NOTE: using the $q ('ie. queue') parameter in service
  this.saveItem = function(userObjectId, itemsToSave) {
    var queue = [];

    // loop through each item/user and push each 'request' to the queue array
    itemsToSave.forEach(function(item) {
      var request;
      if (!item._id) { // if item has no id, POST the item to database
        request = $http.post('/api/list/' + userObjectId, item);
      } else {
        request = $http.put('/api/list/' + userObjectId, item).then(function(result) {

          // item = result.data.item;
          item = result.config.data;
          console.log('---------');
          console.log(result);
          console.log(item);
          console.log('---------');
          return item;
        });
      }
      queue.push(request);
    });

    // $q.all runs all the requests in the queue array
    return $q.all(queue).then(function(results) {
      console.log("I saved " + itemsToSave.length + " items!");
    });
  }
});
