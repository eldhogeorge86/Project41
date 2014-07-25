
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

    .controller('HomeCtrl', function($scope, $state, Question, $location, $ionicLoading, $ionicPopup) {

        $scope.question = Question;

        $scope.activeTab = "";

        $scope.onTabSelected = function(title){

            $scope.activeTab = title;
        };

        $scope.typeChanged = function(type){

            $scope.question.type = type;
        };

        $scope.askQuestion = function(){

            var answers = [];
            if(Question.answer1 && Question.answer1.trim().length >0){
                answers.push(Question.answer1.trim());
            }
            if(Question.answer2 && Question.answer2.trim().length >0){
                answers.push(Question.answer2.trim());
            }
            if(Question.answer3 && Question.answer3.trim().length >0){
                answers.push(Question.answer3.trim());
            }
            if(Question.answer4 && Question.answer4.trim().length >0){
                answers.push(Question.answer1.trim());
            }
            if(Question.answer5 && Question.answer5.trim().length >0){
                answers.push(Question.answer5.trim());
            }

            if(!Question.data || Question.data.trim().length < 10 || answers.length < 2){
                return;
            }

            var qObject = $scope.prepareQuestion(answers);

            $scope.showLoading();

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
                data : Question.data.trim(),
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

        $scope.showLoading = function() {
            $ionicLoading.show({
                template: 'Saving...'
            });
        };

        $scope.hideLoading = function(){
            $ionicLoading.hide();
        };

        $scope.query = function (){
            parseObject.queryQuestions(function(result){

                console.log("Query Result : " + result.questions[0].data);
            }, function(){

            });
        };

        $scope.query();
    });