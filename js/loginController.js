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
        vm.bigCircles = [];
        initializeCircles();
        vm.login = function(position) {
            console.log("logeandome");
            $facebook.login().then(function() {
                refresh(position);
            });
        };

        vm.onMouseOver = onMouseOver;
        vm.onMouseOut = onMouseOut;
        vm.onMouseOverBig = onMouseOverBig;
        vm.onMouseOutBig = onMouseOutBig;

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
            vm.bigCircles.push({imageUrl: 'images/bigcircle1.jpg', isLoggedIn: true});
            vm.bigCircles.push({imageUrl: 'images/bigcircle2.png', isLoggedIn: true});
            vm.bigCircles.push({imageUrl: 'images/bigcircle3.png', isLoggedIn: true});
            vm.bigCircles.push({imageUrl: 'images/bigcircle4.jpg', isLoggedIn: true});
            vm.bigCircles.push({imageUrl: 'images/bigcircle5.jpg', isLoggedIn: true}); 
            for (var i = 0; i < 400; i++)
                vm.circles.push({imageUrl: 'images/review_05.png', isLoggedIn: false, previousImageUrl: 'images/review_05.png'});
        }

        function onMouseOver(position)
        {
            if(vm.circles[position].isLoggedIn) return;
            vm.circles[position].previousImageUrl = vm.circles[position].imageUrl;
            vm.circles[position].imageUrl =  'images/review_06.png';
        }

        function onMouseOverBig(position)
        {
            console.log('llego')
            if(vm.bigCircles[position].isLoggedIn) return;
            vm.bigCircles[position].previousImageUrl = vm.circles[position].imageUrl;
            vm.bigCircles[position].imageUrl =  'images/review_06.png';
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

        function onMouseOutBig(position)
        {
            if(!vm.bigCircles[position].isLoggedIn)
            {
                vm.bigCircles[position].imageUrl =  'images/review_05.png';
            }else{
                vm.bigCircles[position].imageUrl =  vm.bigCircles[position].previousImageUrl;
            }
        }
        refresh();
    }
})();