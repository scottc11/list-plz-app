'use strict';

/*
- Wire up the register and sign in forms
- Update the navigation to reflect the user’s status
- Only allow logged in users access to the /profile route
- Call the protected /api/profile API route
- create a generator for the groupCode
*/

angular.module('listPlz')

  .controller('registerCtrl', ['$scope', '$location', 'authService', 'dataService', function($scope, $location, authService, dataService) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password: "",
      groupCode: "",
      groupOption: "JOIN",
      groupName: ""
    };

    vm.groupOption = "";
    vm.groupCodeExists;

    // check if group code exists in DB on 'blur'
    vm.checkGroupCode = function() {
      authService.groupCodeExists(vm.credentials.groupCode, function(response) {
        console.log(response);
        if (response.status == 200) {
          console.log('Group code: ' + response.data.groupCode +  ' currently exists.');
          vm.credentials.groupCodeExists = true;
        }
        if (response.status == 202) {
          console.log('Group code: ' + response.data.groupCode +  ' does not exist.');
          vm.credentials.groupCodeExists = false;
        }
      });
    }

    vm.buildGroup = function() {
      if (vm.groupOption === "create") {
        authService.createGroup();
      }
    }


    vm.onSubmit = function() {

      console.log('The Credentials via html form --->  ', vm.credentials);
      authService.register(vm.credentials)
        // redirect to profile page
        .then(function(){
          $location.path('/profile');
        });
    };

  }]);
