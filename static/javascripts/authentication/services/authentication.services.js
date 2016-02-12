/**
* Authentication
* @namespace thinkster.authentication.services
*/
(function () {
  'use strict';

  angular
    .module('thinkster.authentication.services', ["ngCookies"])
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$cookies', '$http'];

  /**
  * @namespace Authentication
  * @returns {Factory}
  */
  function Authentication($cookies, $http) {
    /**
    * @name Authentication
    * @desc The Factory to be returned
    */
    var Authentication = {
      register: register,
      login: login,
      logout: logout,
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate
    };

    return Authentication;

    ////////////////////

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} username The username entered by the user
    * @param {string} password The password entered by the user
    * @param {string} email The email entered by the user
    * @returns {Promise}
    * @memberOf thinkster.authentication.services.Authentication
    */
    function register(email, password, username) {
      return $http.post("/api/v1/accounts/", {
        username: username,
        password: password,
        email: email
      })
      .then(registerSuccessHandler, registerErrorHandler);

      function registerSuccessHandler (data, status, headers, config) {
        Authentication.login(email, password);
      }

      function registerErrorHandler (data, status, headers, config) {
        console.error("Login Failed");
        console.error(data);
      }
    }

    function login (email, password) {
      return $http.post("/api/v1/auth/login/", {
        email: email,
        password: password
      })
      .then(loginSuccessHandler, loginErrorHandler);

      function loginSuccessHandler (data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);
        window.location = "/";
      }

      function loginErrorHandler (data, status, handler, config) {
        console.error("Login failed");
        console.error(data);
      }
    }

    function logout () {
      return $http.post("/api/v1/auth/logout/")
        .then(logoutSuccessHandler, logoutErrorHandler);

      function logoutSuccessHandler (data, status, headers, config) {
        Authentication.unauthenticate();
        window.location = "/";
      }

      function logoutErrorHandler (data, status, headers, config) {
        console.error("logout failed");
      }
    }

    function getAuthenticatedAccount () {
      if(!$cookies.authenticatedAccount){
        return;
      }
      return JSON.parse($cookies.authenticatedAccount);
    }

    function isAuthenticated () {
      return !!$cookies.authenticatedAccount;
    }

    function setAuthenticatedAccount (account) {
      $cookies.authenticatedAccount = JSON.stringify(account);
    }

    function unauthenticate () {
      delete $cookies.authenticatedAccount;
    }
  }
})();