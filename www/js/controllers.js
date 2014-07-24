angular.module('project41.controllers', [])

    .controller('AppCtrl', function($scope, $state, $rootScope, $location, $window) {

        $rootScope.$on('loggedIn', function() {

            console.log("loggedIn event");
            $scope.displayName = $rootScope.displayName;
        });

        console.log("From controller, display name : " + $scope.displayName);

        $scope.logout = function () {

            if(typeof parseObject!= "undefined")
            {
                parseObject.logout(function(){

                    $rootScope.slideSideMenu = false;
                    $rootScope.isLoggedIn = false;
                    $location.replace();
                    $location.path('/app/login');
                    $location.replace();

                }, function(){});
            }
            else{
                $rootScope.slideSideMenu = false;
                $rootScope.isLoggedIn = false;
                $location.replace();
                $location.path('/app/login');
                $location.replace();
            }
        };
    })

    .controller('HomeCtrl', function($scope, $state) {

        $scope.activeTab = "";

        $scope.onTabSelected = function(title){

            $scope.activeTab = title;
        }
    })

    .controller('LoginCtrl', function ($rootScope, $scope, $state, $location, $ionicLoading, $ionicPopup, $ionicModal) {

        $ionicModal.fromTemplateUrl('signUp.html', function(modal) {
                $scope.signUpView = modal;
            },
            {
                focusFirstInput: false,
                scope: $scope
            });

        $scope.showLoading = function() {
            $ionicLoading.show({
                template: 'Loading...'
            });
        };

        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };

        $scope.signUp = function(){

            $scope.signUpView.show();
        };

        $scope.facebookLogin = function () {

            if(typeof parseObject!= "undefined")
            {
                $scope.showLoading();

                parseObject.fbLogin(function(){
                    console.log("login success, redirect to home");
                    $rootScope.isLoggedIn = true;
                    $location.replace();
                    $state.go('app.home');
                    $location.replace();
                    $scope.hideLoading();

                }, function(){
                    $scope.hideLoading();
                    $ionicPopup.alert({
                        title: 'Facebook Login Failed',
                        template: 'Login failed. Try again.'
                    });
                });
            }
            else{
                $rootScope.isLoggedIn = true;
                $location.replace();
                $location.path('/app/home');
                $location.replace();
            }
        };

        $scope.createUser = function(user)  {

            if(!user.name || !user.email || !user.password)
            {
                return;
            }

            $scope.showLoading();
            parseObject.signup(user.name, user.email, user.password, function(ret){

                $scope.hideLoading();
                $rootScope.displayName = ret.name;
                $rootScope.$broadcast("loggedIn");

                var alertPopup = $ionicPopup.alert({
                    title: 'SignUp Passed',
                    template: 'Don\'t forget to verify your email.'
                });

                alertPopup.then(function(){
                    $scope.closeSignUp();

                    $rootScope.isLoggedIn = true;
                    $location.replace();
                    $location.path('/app/home');
                    $location.replace();
                });

            }, function(){

                $scope.hideLoading();
                $ionicPopup.alert({
                    title: 'SignUp Failed',
                    template: 'SignUp failed. Try different email/password again.'
                });
            });
        };

        $scope.login = function(user)  {

            if(!user.email || !user.password)
            {
                return;
            }

            $scope.showLoading();

            parseObject.login(user.email, user.password, function(ret){
                $scope.hideLoading();
                $rootScope.displayName = ret.name;
                $rootScope.$broadcast("loggedIn");
                $rootScope.isLoggedIn = true;
                $location.replace();
                $location.path('/app/home');
                $location.replace();
            }, function(){
                $scope.hideLoading();
                $ionicPopup.alert({
                    title: 'Login Failed',
                    template: 'Incorrect email/password'
                });
            });
        };

        $scope.closeSignUp = function() {
            $scope.signUpView.hide();
        };
    });
