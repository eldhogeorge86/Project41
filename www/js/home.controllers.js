
angular.module('home.controllers', [])

    .factory('Question', function(){
        return {
            type : "",
            data : "",
            answer1 : "",
            answer2 : "",
            answer3 : "",
            answer4 : "",
            answer5 : ""
        };
    })

    .controller('HomeCtrl', function($scope, $state, Question) {

        $scope.question = Question;

        $scope.activeTab = "";

        $scope.onTabSelected = function(title){

            $scope.activeTab = title;
        };

        $scope.typeChanged = function(type){

            $scope.question.type = type;
        };

        $scope.askQuestion = function(){

        };
    });