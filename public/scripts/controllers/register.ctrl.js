'use strict';

/*
- Wire up the register and sign in forms
- Update the navigation to reflect the user’s status
- Only allow logged in users access to the /profile route
- Call the protected /api/profile API route
*/

angular.module('listPlz')

  .controller('registerCtrl', function($location, authService) {
    var vm = this;
    console.log('register controller hooked up');
    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      console.log('Submitting registration');
      authService
        .register(vm.credentials)
        .error(function(err){
          alert(err);
        })
        .then(function(){
          $location.path('profile');
        });
    };
  });
