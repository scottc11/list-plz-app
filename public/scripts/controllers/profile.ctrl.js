'use strict';

angular.module('listPlz')
  .controller('profileCtrl', function($location, dataService) {
    var vm = this;

    vm.user = {};

    dataService.getProfile()
      .then(function(userData) {
        vm.user = userData;
      },
      function (error) {
        console.log(error);
      });

  });
