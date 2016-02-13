(function  () {
    "use strict";

    angular
        .module("thinkster.posts.controllers")
        .controller("NewPostController", NewPostController);

        NewPostController.$inject = ["$rootScope", "$scope", "Authentication", "Snackbar", "Posts"];

        function NewPostController ($rootScope, $scope, Authentication, Snackbar, Posts) {
            var self = this;

            self.submit = submit;

            function submit () {
                $rootScope.$broadcast("post.created", {
                    content: self.content,
                    author: {
                        username: Authentication.getAuthenticatedAccount().username
                    }
                });

                $scope.closeThisDialog();

                Posts.create(self.content).then(newPostSuccessHandler, newPostErrorHandler);

                function newPostSuccessHandler (data, status, headers, config) {
                    Snackbar.show("New post created");
                }

                function newPostErrorHandler (data, status, headers, config) {
                    $rootScope.$broadcast("post.created.error");
                    Snackbar.error(data.error);
                }
            }
        }
})();