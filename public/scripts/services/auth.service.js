
'use strict';

/*
- Saving the JWT in local storage
- Reading the JWT from local storage
- Deleting the JWT from local storage
- Calling the register and login API end points
- Checking whether a user is currently logged in
- Getting the details of the logged in user from the JWT
*/

/*
A JWT is actually made up of three separate strings, separated by a dot .. These three parts are:

Header – An encoded JSON object containing the type and the hashing algorithm used
Payload – An encoded JSON object containing the data, the real body of the token
Signature – An encrypted hash of the header and payload, using the “secret” set on the server
*/

// TODO: change token name from 'mean-token' to anything else

angular.module('listPlz')

.service('authService', function($http, $window) {

  var self = this;

  var saveToken = function(token) {
    $window.localStorage['mean-token'] = token;
  };

  var getToken = function() {
    return $window.localStorage['mean-token'];
  };


  var isLoggedIn = function() {
    var token = getToken();
    var payload;

    // if token exits, validate it to see if it has expired
    if(token){
      payload = token.split('.')[1]; // token is a string like this "string(ie.header).string(ie. payload).string(ie. signature)"
      payload = $window.atob(payload); //  atob() is native to modern browsers, that will decode a Base64 string
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000; // This equates to a boolean value
    } else {
      return false;
    }
  };

  // Checking to see if a group exists when 'joining' an already created group
  var groupCodeExists = function(code, callback) {
    var isValid = $http.get('api/auth/validateGroupCode/' + code)
      .then(callback);
  }

  var createGroup = function() {
    $http.post('api/auth/createGroup')
      .then(function(response) {
        console.log(response);
      });
  }

  // get the details of the logged in user.
  // This will extract the email and name from the JWT and return them inside an object ready to be used.
  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        _id: payload._id,
        email : payload.email,
        name : payload.name
      };
    }
  };


  // All functions below used to be declared using 'this.'
  var register = function(user) {
    return $http.post('/api/auth/register/', user)
        .then(function(response) {
          console.log(response);
          saveToken(response.data.token);
        },
        function(error) {
          console.log('error: ', error);
        });
  };


  var login = function(user) {
    return $http.post('/api/auth/login', user).then(function(response) {
      saveToken(response.data.token);
    }, function(error) {
      console.log("Authorization error", error.data);
    });
  }


  var logout = function() {
    if ($window.localStorage['mean-token']) {
      $window.localStorage.removeItem('mean-token');
      console.log('Logged out user.');
    }
  };

  return {
    currentUser : currentUser,
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    groupCodeExists : groupCodeExists,
    createGroup : createGroup,
    register : register,
    login : login,
    logout : logout
  };

});
