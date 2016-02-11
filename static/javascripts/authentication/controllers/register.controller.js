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
        }
})();