'use strict'


angular.module('listPlz', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/register', {templateUrl: '../templates/register.html'});
    $routeProvider.when('/rando', {templateUrl: '../templates/rando.html'});
    $routeProvider.otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({enabled: true, requireBase: false});
  }]);



// TODO: add strike-through when item.purchased is == true
// TODO: create an ng-model="item.purchased" and attach
// it to the <input type="checkbox"> html.  This will be used
// mark a users item as 'purchased' by setting item.purchased to 'true'
