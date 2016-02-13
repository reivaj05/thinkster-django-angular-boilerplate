(function  () {
    "use strict";

    angular
        .module("thinkster.profiles.controllers")
        .controller("ProfileSettingsController", ProfileSettingsController);

    ProfileSettingsController.$inject = [
        "$location", "$routeParams", "Authentication", "Profile", "Snackbar"
    ];

    function ProfileSettingsController ($location, $routeParams, Authentication, Profile, Snackbar) {
        var self = this;
        
        self.destroy = destroy;
        self.update = update;

        init();

        function init () {
            var authenticatedAccount = Authentication.getAuthenticatedAccount();
            var username = $routeParams.username.substr(1);

            if(!authenticatedAccount){
                $location.url("/");
                Snackbar.error("You are not authorized to view this page");
            }
            else{
                if(authenticatedAccount.username !== username){
                    $location.url("/");
                    Snackbar.error("You are not authorized to view this page");
                }
            }

            Profile.get(username).then(profileSuccessHandler, profileErrorHandler);
        
            function profileSuccessHandler (data, status, headers, config) {
                self.profile = data.data;
            }

            function profileErrorHandler (data, status, headers, config) {
                $location.url("/");
                Snackbar.error("The user does not exist");
            }
        }

        function destroy () {
            Profile.destroy(self.profile).then(deleteProfileSuccessHandler, deleteProfileErrorHandler);

            function deleteProfileSuccessHandler (data, status, headers, config) {
                Authentication.unauthenticate();
                window.location = "/";

                Snackbar.show("Your account has been deleted");
            }

            function deleteProfileErrorHandler (data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }

        function update () {
            Profile.update(self.profile).then(updateProfileSuccessHandler, updateProfileErrorHandler);

            function updateProfileSuccessHandler (data, status, headers, config) {
                Snackbar.show("Your profile has been updated");
            }

            function updateProfileErrorHandler (data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }    
})();