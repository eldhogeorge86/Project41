
angular.module('home.controllers', [])

    .factory('DBService', function(){
        return {
            results: [],
            query: function(){

            },
            user:{

            }
        };
    })

    .controller('HomeCtrl', function($scope, $state, DBService, $location, $ionicLoading, $ionicPopup, $ionicActionSheet) {

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
                    $scope.prepareAnswers();
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.hideLoading();
                }, function () {
                    $scope.$broadcast('scroll.refreshComplete');
                    $scope.hideLoading();
                });
            }
            else{
                DBService.user.id = "1";
                $scope.questions = [
                    {
                        data : "test question?",
                        user:{
                            name: "eg"
                        },
                        answer1 : {
                            text : "yes",
                            mine : true,
                            count: 1,
                            voters:["1"]
                        },
                        answer2 : {
                            text : "no",
                            mine : false,
                            count: 0
                        },
                        toAnswer : false
                    }
                ];
                $scope.prepareAnswers();
                $scope.hideLoading();
            }
        };

        $scope.vote = function(qs, ans){
            var voteObj = {
                "ans_id" : ans.id,
                "user_id" : DBService.user.id
            };

            $scope.showLoading('Voting...');

            parseObject.voteAnswer(voteObj, function(){
                qs.count++;
                ans.count++;
                ans.voters.push(DBService.user.id);
                ans.mine = true;
                $scope.calculatePercentage();
                qs.toAnswer = false;
                $scope.hideLoading();
            }, function(){
                $scope.hideLoading();
            });
        };

        $scope.onHold = function(){
            $ionicActionSheet.show({
                destructiveText: 'Remove Vote',
                titleText: 'Change Vote',
                cancelText: 'Cancel',
                destructiveButtonClicked : function() {
                    return true;
                }
            });
        };

        $scope.prepareAnswers = function(){
            for(var i=0;i<$scope.questions.length;i++) {
                $scope.questions[i].hasAnswer1 = $scope.questions[i].answer1 != null;
                $scope.questions[i].hasAnswer2 = $scope.questions[i].answer2 != null;
                $scope.questions[i].hasAnswer3 = $scope.questions[i].answer3 != null;
                $scope.questions[i].hasAnswer4 = $scope.questions[i].answer4 != null;
                $scope.questions[i].hasAnswer5 = $scope.questions[i].answer5 != null;

                $scope.questions[i].toAnswer = true;
                $scope.questions[i].count = 0;

                if ($scope.questions[i].hasAnswer1) {
                    if (typeof $scope.questions[i].answer1.voters == 'undefined') {
                        $scope.questions[i].answer1.voters = [];
                    } else {
                        if ($scope.questions[i].answer1.voters.indexOf(DBService.user.id) != -1) {
                            $scope.questions[i].answer1.mine = true;
                            $scope.questions[i].toAnswer = false;
                        }
                        else{
                            $scope.questions[i].answer1.mine= false;
                        }
                    }
                    $scope.questions[i].count = $scope.questions[i].count + $scope.questions[i].answer1.count;
                    $scope.questions[i].answer1.percent = 0;
                }
                if ($scope.questions[i].hasAnswer2) {
                    if (typeof $scope.questions[i].answer2.voters == 'undefined') {
                        $scope.questions[i].answer2.voters = [];
                    } else {
                        if ($scope.questions[i].answer2.voters.indexOf(DBService.user.id) != -1) {
                            $scope.questions[i].answer2.mine = true;
                            $scope.questions[i].toAnswer = false;
                        }
                        else{
                            $scope.questions[i].answer2.mine= false;
                        }
                    }
                    $scope.questions[i].count = $scope.questions[i].count + $scope.questions[i].answer2.count;
                    $scope.questions[i].answer2.percent = 0;
                }
                if ($scope.questions[i].hasAnswer3) {
                    if (typeof $scope.questions[i].answer3.voters == 'undefined') {
                        $scope.questions[i].answer3.voters = [];
                    } else {
                        if ($scope.questions[i].answer3.voters.indexOf(DBService.user.id) != -1) {
                            $scope.questions[i].answer3.mine = true;
                            $scope.questions[i].toAnswer = false;
                        }
                        else{
                            $scope.questions[i].answer3.mine= false;
                        }
                    }
                    $scope.questions[i].count = $scope.questions[i].count + $scope.questions[i].answer3.count;
                    $scope.questions[i].answer3.percent = 0;
                }
                if ($scope.questions[i].hasAnswer4) {
                    if (typeof $scope.questions[i].answer4.voters == 'undefined') {
                        $scope.questions[i].answer4.voters = [];
                    } else {
                        if ($scope.questions[i].answer4.voters.indexOf(DBService.user.id) != -1) {
                            $scope.questions[i].answer4.mine = true;
                            $scope.questions[i].toAnswer = false;
                        }
                        else{
                            $scope.questions[i].answer4.mine= false;
                        }
                    }
                    $scope.questions[i].count = $scope.questions[i].count + $scope.questions[i].answer4.count;
                    $scope.questions[i].answer4.percent = 0;
                }
                if ($scope.questions[i].hasAnswer5) {
                    if (typeof $scope.questions[i].answer5.voters == 'undefined') {
                        $scope.questions[i].answer5.voters = [];
                    } else {
                        if ($scope.questions[i].answer5.voters.indexOf(DBService.user.id) != -1) {
                            $scope.questions[i].answer5.mine = true;
                            $scope.questions[i].toAnswer = false;
                        }
                        else{
                            $scope.questions[i].answer5.mine= false;
                        }
                    }
                    $scope.questions[i].count = $scope.questions[i].count + $scope.questions[i].answer5.count;
                    $scope.questions[i].answer5.percent = 0;
                }
            }

            $scope.calculatePercentage();
        };

        $scope.calculatePercentage = function(){
            for(var i=0;i<$scope.questions.length;i++) {
                if ($scope.questions[i].hasAnswer1 && $scope.questions[i].count > 0) {
                    $scope.questions[i].answer1.percent = Math.round($scope.questions[i].answer1.count * 100 / $scope.questions[i].count);
                }
                if ($scope.questions[i].hasAnswer2 && $scope.questions[i].count > 0) {
                    $scope.questions[i].answer2.percent = Math.round($scope.questions[i].answer2.count * 100 / $scope.questions[i].count);
                }
                if ($scope.questions[i].hasAnswer3 && $scope.questions[i].count > 0) {
                    $scope.questions[i].answer3.percent = Math.round($scope.questions[i].answer3.count * 100 / $scope.questions[i].count);
                }
                if ($scope.questions[i].hasAnswer4 && $scope.questions[i].count > 0) {
                    $scope.questions[i].answer4.percent = Math.round($scope.questions[i].answer4.count * 100 / $scope.questions[i].count);
                }
                if ($scope.questions[i].hasAnswer5 && $scope.questions[i].count > 0) {
                    $scope.questions[i].answer5.percent = Math.round($scope.questions[i].answer5.count * 100 / $scope.questions[i].count);
                }
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
                answers.push($scope.question.answer4.trim());
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