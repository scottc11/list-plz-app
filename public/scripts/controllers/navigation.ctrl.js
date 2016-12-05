'use strict';

angular.module('listPlz')
  .controller('navigationCtrl', function($location, authService) {
    var vm = this;
    console.log("nav controller hooked up");
    vm.isLoggedIn = authService.isLoggedIn;
    console.log(vm.isLoggedIn);
    vm.currentUser = authService.currentUser;
    console.log(vm.currentUser);
  }
);
