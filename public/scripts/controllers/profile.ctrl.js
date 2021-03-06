'use strict';

angular.module('listPlz')
  .controller('profileCtrl', function($location, $rootScope, dataService) {
    var vm = this;

    $rootScope.appBackground = "bg-color-dark-grey";

    vm.user = {};

    dataService.getProfile()

      .then(function(userData) {
        vm.user = userData;
      },
      function (error) {
        console.log(error);
      }
    )

  });

// NOTE: this contoller successfully gets and recieves user data from the API
// based off of the current json web token found in the browsers local storage.
// It uses the api route "/api/auth/profile"
