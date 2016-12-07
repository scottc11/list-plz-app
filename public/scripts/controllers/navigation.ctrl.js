'use strict';

angular.module('listPlz')
  .controller('navigationCtrl', function($rootScope, $location, authService) {
    var vm = this;


    $rootScope.updateNav = function() {
      vm.isLoggedIn = authService.isLoggedIn();
      vm.currentUser = authService.currentUser();
    }

    vm.logout = function() {
      authService.logout();
      vm.isLoggedIn = authService.isLoggedIn();
    }


    vm.isLoggedIn = authService.isLoggedIn();
    vm.currentUser = authService.currentUser();

  }
);
