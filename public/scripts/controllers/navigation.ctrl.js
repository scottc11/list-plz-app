'use strict';

angular.module('listPlz')
  .controller('navigationCtrl', function($rootScope, $location, authService) {
    var nav = this;


    $rootScope.updateNav = function() {
      nav.isLoggedIn = authService.isLoggedIn();
      nav.currentUser = authService.currentUser();
    }

    nav.logout = function() {
      authService.logout();
      nav.isLoggedIn = authService.isLoggedIn();
    }

    nav.setSelected = function(navItem) {
      nav.selectedNavItem = navItem;
    }

    nav.navItems = [
      {label: "home"},
      {label: "Sign Up"},
      {label: "Login"},

      {label: "Home"},
      {label: "Wishlists"},
      {label: "My Wishlist"},
      {label: "Profile"},
      {label: "Logout"}
    ]

    nav.isLoggedIn = authService.isLoggedIn();
    nav.currentUser = authService.currentUser();

  }
);
