/**
 * Created by erick304 on 09/07/2016.
 */
(function(){
    'use strict';
    angular.module('beInTheO')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($facebook) {
        var vm = this;
        vm.circles = [];
        initializeCircles();
        vm.login = function(position) {
            console.log("logeandome");
            $facebook.login().then(function() {
                refresh(position);
            });
        };

        vm.onMouseOver = onMouseOver;
        vm.onMouseOut = onMouseOut;

        function refresh(position) {
            $facebook.api("/me/picture?type=normal").then(
                function(response) {
                    vm.circles[position].imageUrl = response.data.url;
                    vm.circles[position].isLoggedIn = true;
                    vm.circles[position].previousImageUrl = response.data.url;
                },
                function(err) {

                });
        }

        function initializeCircles() {
            for (var i = 0; i < 100; i++)
                vm.circles.push({imageUrl: 'images/review_05.png', isLoggedIn: false, previousImageUrl: 'images/review_05.png'});
        }

        function onMouseOver(position)
        {
            if(vm.circles[position].isLoggedIn) return;
            vm.circles[position].previousImageUrl = vm.circles[position].imageUrl;
            vm.circles[position].imageUrl =  'images/review_06.png';
        }

        function onMouseOut(position)
        {
            if(!vm.circles[position].isLoggedIn)
            {
                vm.circles[position].imageUrl =  'images/review_05.png';
            }else{
                vm.circles[position].imageUrl =  vm.circles[position].previousImageUrl;
            }
        }
        refresh();
    }
})();