'use strict'


angular.module('listPlz', ['ngRoute'])

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/register', {
        templateUrl: '../templates/register.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '../templates/login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/profile', {
        templateUrl: '../templates/profile.html',
        controller: 'profileCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({enabled: true, requireBase: false});
  }])

  /*
  TODO: make a route accessible only to logged in users, by protecting the /profile path.

  To do this we need to check whenever the route changes in the Angular app by using a watcher on $routeChangeStart. When a new route is selected we need to check whether it is the profile page, and whether the user is logged in. If it is the profile page and the user is not logged in, then we’ll redirect to the homepage

  - $rootScope to listen for the $routeChangeStart event
  - $location to see what the new path is
  - authentication to use our service, calling the isLoggedIn method
  */

  // if an unauthenticated user tries to visit the profile page they will be redirected to the homepage.
  .run(['$rootScope', '$location', 'authService', function($rootScope, $location, authService){
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/profile' && !authService.isLoggedIn) {
        $location.path('/');
      }
    });
  }]);



// TODO: add strike-through when item.purchased is == true
// TODO: create an ng-model="item.purchased" and attach
// it to the <input type="checkbox"> html.  This will be used
// mark a users item as 'purchased' by setting item.purchased to 'true'
