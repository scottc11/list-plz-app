'use strict';

angular.module('listPlz')
  .controller('profileCtrl', function($location, dataService) {
    var vm = this;

    vm.user = {};

    dataService.getProfile()
      .success(function(data) {
        vm.user = data;
      })
      .error(function (error) {
        console.log(error);
      });

  });
