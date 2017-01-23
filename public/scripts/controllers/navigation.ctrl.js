'use strict';

angular.module('listPlz')
  .controller('navigationCtrl', function($rootScope, $location, authService) {
    var nav = this;


    $rootScope.updateNav = function() {
      nav.isLoggedIn = authService.isLoggedIn();
      nav.currentUser = authService.currentUser();
    }

    nav.logout = function(navItem) {
      if (navItem.label == "Logout") {
        authService.logout();
        nav.isLoggedIn = authService.isLoggedIn();
      }
    }



    nav.setSelected = function(navItem) {
      nav.selectedNavItem = navItem;
    }

    nav.navItemsLoggedOut = [
      {label: "Home", href: "/"},
      {label: "Sign Up", href: "/register"},
      {label: "Login", href: "/login"}
    ]

    nav.navItemsLoggedIn = [
      {label: "Home", href: "/"},
      {label: "Wishlists", href: "/group-wishlists"},
      {label: "My Wishlist", href: "/wishlist"},
      {label: "Profile", href: "/profile"},
      {label: "Logout", href: "/"}
    ]

    nav.selectedNavItem = nav.navItemsLoggedOut[0]; // INIT the first nav item on app load
    nav.isLoggedIn = authService.isLoggedIn();
    nav.currentUser = authService.currentUser();

  }
);
