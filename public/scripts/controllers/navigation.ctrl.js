'use strict';

angular.module('listPlz')
  .controller('navigationCtrl', function($location, authService) {
    var vm = this;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();
  }
);
