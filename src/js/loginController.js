/**
 * Created by erick304 on 09/07/2016.
 */
(function(){
    'use strict';
    angular.module('beInTheO')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($facebook) {
        var vm = this;
        vm.isLoggedIn = false;
        vm.login = function() {
            console.log("logeandome");
            $facebook.login().then(function() {
                refresh();
            });
        };
        function refresh() {
            $facebook.api("/me/picture?type=normal").then(
                function(response) {
                    vm.imageUrl = response.data.url;
                    vm.isLoggedIn = true;
                },
                function(err) {
                    vm.welcomeMsg = "Please log in";
                });
        }

        refresh();
    }
})();