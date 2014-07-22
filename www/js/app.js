// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('project41', ['ionic', 'project41.controllers'])

    .run(function($rootScope, $state, $ionicPlatform, $location, $window) {
        $ionicPlatform.ready(function() {

            console.log("ionic ready");

            if(typeof parseObject!= "undefined")
            {
                parseObject.initialize(function(){}, function(){});
            }

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            if(typeof parseObject!= "undefined")
            {
                parseObject.isLoggedIn(function(ret){
                        if(ret != null && ret.exists) {
                            console.log("already logged in, redirect to home");
                            $rootScope.isLoggedIn = true;
                            $rootScope.slideSideMenu = true;
                            $location.replace();
                            $state.go('app.home');
                        }
                        else {
                            $rootScope.isLoggedIn = false;
                            $rootScope.slideSideMenu = false;
                            $location.replace();
                            $state.go('app.login');
                        }
                    },
                    function(){
                        $rootScope.isLoggedIn = false;
                        $rootScope.slideSideMenu = false;
                        $location.replace();
                        $state.go('app.login');
                    });
            }
            else{
                $rootScope.slideSideMenu = false;
                $location.replace();
                $location.path('/app/login');
            }

        });

        $rootScope.slideSideMenu = false;
        $rootScope.isLoggedIn = false;

        $rootScope.$on('$stateChangeStart', function(event, toState) {
            console.log("state change " + toState.name + " " + $rootScope.isLoggedIn);
            if (toState.name == "app.login" && $rootScope.isLoggedIn == true) {
                console.log("exit app");
                navigator.app.exitApp();
                return;
            }
            if (toState.name !== "app.login" && toState.name !== "app.logout" && $rootScope.isLoggedIn == false) {
                console.log("redirect to login");
                $location.replace();
                $state.go('app.login');
                event.preventDefault();
            }
        });

    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.login', {
                url: "/login",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/login.html",
                        controller: 'LoginCtrl'
                    }
                }
            })

            .state('app.splash', {
                url: "/splash",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/splash.html"
                    }
                }
            })

            .state('app.home', {
                url: "/home",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/home.html",
                        controller: 'HomeCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/splash');
    });