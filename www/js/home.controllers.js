
angular.module('home.controllers', [])

    .controller('HomeCtrl', function($scope, $state) {

        $scope.activeTab = "";

        $scope.onTabSelected = function(title){

            $scope.activeTab = title;
        }
    });