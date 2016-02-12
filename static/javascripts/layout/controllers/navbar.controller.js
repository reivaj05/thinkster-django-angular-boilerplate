(function  () {
    "use strict";

    angular
        .module("thinkster.layout.controllers", [])
        .controller("NavBarController", NavBarController);

    function NavBarController (Authentication) {
        var self = this;

        self.logout = logout;

        function logout () {
            Authentication.logout();
        }
    }
})();   