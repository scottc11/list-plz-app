'use strict';

angular.module('listPlz')
  .controller('navigationCtrl', function($location, authService) {
    var vm = this;
    console.log("nav controller hooked up");

    vm.isLoggedIn = authService.isLoggedIn;
    
    vm.currentUser = authService.currentUser;
  }
);
