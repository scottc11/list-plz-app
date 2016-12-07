'use strict';

// NOTE: there should be more validation in the forms to ensure that all required fields are filled before submitting;

angular.module('listPlz')
  .controller('loginCtrl', function($location, authService) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.onSubmit = function () {

      authService
        .login(vm.credentials)
        .then(function(){
          $location.path('profile');
        }, function(err){
          alert(err);
        });
    };
  }
);
