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
      console.log('getting called');
      nav.selectedNavItem = navItem;

    }

    nav.navItems = [
      {label: "Home", href: "/", bgClass: "bg-color-dark-grey"},
      {label: "Sign Up", href: "/register"},
      {label: "Login", href: "/login"}

      // {label: "Home", href: "/"},
      // {label: "Wishlists", href: "/group-wishlists"},
      // {label: "My Wishlist", href: "/wishlist"},
      // {label: "Profile", href: "/profile"},
      // {label: "Logout", href: "/"}
    ]

    nav.selectedNavItem = nav.navItems[0]; // INIT the first nav item on app load
    nav.isLoggedIn = authService.isLoggedIn();
    nav.currentUser = authService.currentUser();

  }
);
