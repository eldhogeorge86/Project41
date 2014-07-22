angular.module('project41.controllers', [])

    .controller('AppCtrl', function($scope, $state, $rootScope, $location, $window) {

        $scope.logout = function () {

            if(typeof parseObject!= "undefined")
            {
                parseObject.logout(function(){

                    $rootScope.slideSideMenu = false;
                    $rootScope.isLoggedIn = false;
                    $location.replace();
                    $location.path('/app/login');

                }, function(){});
            }
            else{
                $rootScope.slideSideMenu = false;
                $rootScope.isLoggedIn = false;
                $location.replace();
                $location.path('/app/login');
            }
        };
    })

    .controller('HomeCtrl', function($scope, $state) {
    })

    .controller('LoginCtrl', function ($rootScope, $scope, $state, $location, $window) {

        $scope.facebookLogin = function () {

            if(typeof parseObject!= "undefined")
            {
                parseObject.fbLogin(function(){
                    console.log("login success, redirect to home");
                    $rootScope.isLoggedIn = true;
                    $location.replace();
                    $state.go('app.home');

                }, function(){});
            }
            else{
                $rootScope.isLoggedIn = true;
                $location.replace();
                $location.path('/app/home');
            }
        };

    })
