(function  () {
    "use strict";

    angular
        .module("thinkster", [
            "thinkster.routes",
            "thinkster.authentication",
            "thinkster.layout",
            "thinkster.posts",
            "thinkster.utils"
        ])
        .run(run);

        run.$inject = ["$http"];

        function run ($http) {
            $http.defaults.xsrfHeaderName = "X-CSRFToken";
            $http.defaults.xsrfCookieName = "csrftoken";
        }
})();