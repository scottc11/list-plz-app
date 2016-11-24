'use strict'

angular.module('listPlz', [])
  .controller('mainCtrl', function($scope) {
    $scope.helloWorld = function() {
      console.log("hello there! This is the hello world controller function in the main controller");
    }
  });
