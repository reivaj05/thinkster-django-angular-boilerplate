(function  () {
    "use strict";

    angular
        .module("thinskter.layout.controllers")
        .controller("IndexController", IndexController);

    IndexController.$inject = ["$scope", "Authentication", "Posts", "Snackbar"]
    
    function IndexController ($scope, Authentication, Posts, Snackbar) {
        var self = this;

        self.isAuthenticated = Authentication.isAuthenticated();
        self.posts = [];

        init();

        function init () {
            Posts.all().then(postsSuccessHandler, postsErrorHandler);
            
            $scope.$on("post.created", function(event, post){
                self.posts.unshift(post);
            });

            $scope.$on("post.created.error", function(){
                self.posts.shift();
            });

            function postsSuccessHandler (data, status, headers, config) {
                self.posts = data.data;
            }

            function postsErrorHandler (data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();