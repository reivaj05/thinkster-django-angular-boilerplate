(function  () {
    "use strict";
    angular
        .module("thinkster.posts.controllers")
        .controller("PostsController", PostsController);

    PostsController.$inject = ["$scope"];
    function PostsController ($scope) {
        var self = this;
        self.columns = [];

        init();

        function init(){
            $scope.$watchCollection(function(){
                return $scope.posts;
            }, render);
           /* $scope.$watch(function(){
                return $(window).width();
            }, render);*/
        }

        function calculateNumberOfColumns () {
            var width = $(window).width();

            if(width >= 1200){
                return 4;
            }
            else if(width >= 992){
                return 3;
            }
            else if(width >= 992){
                return 2;
            }
            else{
                return 1;
            }
        }

        function getShortestColumn () {
            var scores = self.columns.map(columnMap);

            return scores.indexOf(Math.min.apply(this, scores));

            function columnMap (column) {
                var lengths = column.map(function(element){
                    return element.content.length;
                });

                return lengths.reduce(sum, 0) * column.length;
            }

            function sum (m, n) {
                return m + n;
            }
        }

        function render (current, original) {
            if(current !== original){
                self.columns = [];

                for (var i = 0; i < calculateNumberOfColumns(); ++i) {
                    self.columns.push([]);
                }
                for (var i = 0; i < current.length; ++i) {
                    var column = getShortestColumn();
                    self.columns[column].push(current[i]);
                }
            }
        }
    }
})();