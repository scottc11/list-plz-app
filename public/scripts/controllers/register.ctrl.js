'use strict';

/*
- Wire up the register and sign in forms
- Update the navigation to reflect the user’s status
- Only allow logged in users access to the /profile route
- Call the protected /api/profile API route
*/

angular.module('listPlz')

  .controller('registerCtrl', ['$location', 'authService', function($location, authService) {
    var vm = this;
    console.log(authService);
    console.log('register controller hooked up');
    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.onSubmit = function() {
      console.log('Submitting registration');
      console.log(vm.credentials);
      authService.register(vm.credentials)
        .then(function(){
          console.log('redirect to user profile page');
          // $location.path('profile');
        });
    };
  }]);
