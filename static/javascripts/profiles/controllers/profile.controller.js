(function  () {
    "use strict";

    angular
        .module("thinkster.profiles.controllers")
        .controller("ProfileController", ProfileController);

    ProfileController.$inject = ["$location", "$routeParams", "Posts", "Profile", "Snackbar"];

    function ProfileController ($location, $routeParams, Posts, Profile, Snackbar) {
        var self = this;

        self.profile = null;
        self.posts = [];

        init();

        function init () {
            var username = $routeParams.username.substr(1);

            Profile.get(username).then(profileSuccessHandler, profileErrorHandler);
            Posts.get(username).then(postsSuccessHandler, postsErrorHandler);
        
            function profileSuccessHandler (data, status, headers, config) {
                self.profile = data.data;
            }

            function profileErrorHandler (data, status, headers, config) {
                $location.url("/");
                Snackbar.error("The user does not exist");
            }

            function postsSuccessHandler (data, status, headers, config) {
                self.posts = data.data;
            }

            function postsErrorHandler (data, status, headers, config) {
                Snackbar.error(data.data.error);
            }
        }
    }
})();