(function() {
    "use strict";

    angular
        .module("thinkster.authentication.controllers", [])
        .controller("RegisterController", RegisterController);

        RegisterController.$inject = ["$location", "Authentication"];

        function RegisterController($location, Authentication){
            var self = this;

            self.register = register;

            function register () {
                Authentication.register(self.email, self.password, self.username);
            }

            activate();

            /**
             * @name activate
             * @desc Actions to be performed when this controller is instantiated
             * @memberOf thinkster.authentication.controllers.RegisterController
             */
            function activate() {
              // If the user is authenticated, they should not be here.
              if (Authentication.isAuthenticated()) {
                $location.url('/');
              }
            }
        }
})();