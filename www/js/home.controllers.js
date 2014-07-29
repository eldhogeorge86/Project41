
angular.module('home.controllers', [])

    .factory('DBService', function(){
        return {
            results: [],
            query: function(){

            }
        };
    })

    .controller('HomeCtrl', function($scope, $state, DBService, $location, $ionicLoading, $ionicPopup) {

        $scope.questions = [];

        $scope.activeTab = "";

        $scope.onTabSelected = function(title){

            $scope.activeTab = title;
        };

        $scope.showLoading = function(txt) {
            $ionicLoading.show({
                template: txt
            });
        };

        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };

        $scope.query = function (){

            $scope.showLoading('Loading...');

            if(typeof parseObject!= "undefined") {
                parseObject.queryQuestions(function (result) {

                    console.log("Query Result length: " + result.questions.length);

                    $scope.questions = result.questions;
                    $scope.hideLoading();
                }, function () {
                    $scope.hideLoading();
                });
            }
            else{
                $scope.hideLoading();
            }
        };

        $scope.query();
    })

    .controller('AskQuestionCtrl', function($scope, $state, DBService, $location, $ionicLoading, $ionicPopup) {

        $scope.question = {
            data : "",
            answer1 : "",
            answer2 : "",
            answer3 : "",
            answer4 : "",
            answer5 : ""
        };

        $scope.showLoading = function(txt) {
            $ionicLoading.show({
                template: txt
            });
        };

        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };

        $scope.askQuestion = function(){

            var answers = [];
            if($scope.question.answer1 && $scope.question.answer1.trim().length >0){
                answers.push($scope.question.answer1.trim());
            }
            if($scope.question.answer2 && $scope.question.answer2.trim().length >0){
                answers.push($scope.question.answer2.trim());
            }
            if($scope.question.answer3 && $scope.question.answer3.trim().length >0){
                answers.push($scope.question.answer3.trim());
            }
            if($scope.question.answer4 && $scope.question.answer4.trim().length >0){
                answers.push($scope.question.answer1.trim());
            }
            if($scope.question.answer5 && $scope.question.answer5.trim().length >0){
                answers.push($scope.question.answer5.trim());
            }

            if(!$scope.question.data || $scope.question.data.trim().length < 10 || answers.length < 2){
                return;
            }

            var qObject = $scope.prepareQuestion(answers);

            $scope.showLoading('Saving...');

            parseObject.askQuestion(qObject, function(){

                $scope.hideLoading();
                $location.path("/app/home");
            }, function(){
                $scope.hideLoading();
                $ionicPopup.alert({
                    title: 'Save Failed',
                    template: 'Save failed. Try again.'
                });
            });
        };

        $scope.prepareQuestion = function(answers){
            var q = {
                data : $scope.question.data.trim(),
                answers : answers
            };

            q.answer1 = answers[0];
            q.answer2 = answers[1];
            if(answers.length > 2){
                q.answer3 = answers[2];
            }
            if(answers.length > 3){
                q.answer4 = answers[3];
            }
            if(answers.length > 4){
                q.answer5 = answers[4];
            }

            return q;
        };
    });