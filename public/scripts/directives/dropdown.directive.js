'use strict';
// NOTE: https://www.codementor.io/angularjs/tutorial/create-dropdown-control
// Here’s an example of how you can use the dropdown.
// The 'placeholder' attribute defines what text to show before the
// user selected anything. The 'colours' variable corresponds to a
// list of items you want to show in the list, which is used in
// conjunction with the 'property' attribute, which defines the property
// that should be displayed to the user from your complex JavaScript
// list objects. Finally, the 'selected' attribute stores the selected
// value on the parent controller.

angular.module('listPlz')
  .directive("dropdown", function($rootScope) {
  	return {
  		restrict: "E",
  		templateUrl: "templates/dropdown.html",
      // creating an 'isolated' scope
  		scope: {
  			placeholder: "@",
  			list: "=",
  			selected: "=",
  			property: "@"
  		},
  		link: function(scope, element, attr) {
  			scope.listVisible = false;
  			scope.isPlaceholder = true;

        // click handler for each item -> sets the selected item on the scope.
  			scope.select = function(item) {
  				scope.isPlaceholder = false;
  				scope.selected = item;
  			};

        // determines if the passed item is selected
  			scope.isSelected = function(item) {
  				return item[scope.property] === scope.selected[scope.property];
  			};

        // expands the dropdown.
  			scope.show = function() {
  				scope.listVisible = true;
  			};

        // hooking into the documentClicked event to determine if we need to close the dropdown
  			$rootScope.$on("documentClicked", function(inner, target) {
  				console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
  				if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
  					scope.$apply(function() {
  						scope.listVisible = false;
  					});
  			});

        // Watching for changes on the selected scope variable so as to update the displayed value at the top of the rendered dropdown
  			scope.$watch("selected", function(value) {
  				scope.isPlaceholder = scope.selected[scope.property] === undefined;
  				scope.display = scope.selected[scope.property];
  			});

        // console.log('Scope: ', scope);
        console.log('Scope.List: ', scope.list);
        console.log('Scope.selected: ', scope.selected);
        console.log('Element: ', element);
        console.log('Attr: ', attr);
  		}
  	}
});
