var app = angular.module('mgcrea.ngStrapDocs', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap','ngRoute']);

'use strict';

angular.module('mgcrea.ngStrapDocs');

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login_page.html',
            controller: 'loginCtrl'
        })
        .when('/home', {
            templateUrl: 'login_page.html',
            controller: 'loginCtrl'
        })
        .when('/clientpage', {
            templateUrl: 'news.html',
            controller: 'clientpageCtrl'
        })  
        .when('/clientpage/news', {
            templateUrl: 'news.html',
            controller: 'newsCtrl'
        }) 
        .when('/clientpage/teams', {
            templateUrl: 'teams.html',
            controller: 'teamsCtrl'
        })   
        .when('/clientpage/feedback', {
            templateUrl: 'feedback.html',
            controller: 'feedbackCtrl'
        })  
        .when('/clientpage/news/news_edit', {
            templateUrl: 'news_edit.html',
            controller: 'news_editCtrl'
        })
        //.when('/apply', {
        //    templateUrl: 'apply.html',
        //    controller: 'applyController'
        //})
        .otherwise({
            redirectTo: '/404'
        });
    //$locationProvider.html5Mode(true);
});
app.controller("mainCtrl", function($scope,$http) {
    $http.get("/rest/feedbacks")
        .success(function (data) {
        $scope.news = data;

        }
    )
        .error(function (data){
            console.log(data)
        });



        $scope.feedback_submit = function(){

        var feedback_info = {name:$scope.feedback_name, email:$scope.feedback_email, subject:$scope.feedback_subject, message:$scope.feedback_message};
        console.log(feedback_info);
//        window.location.replace("#/clientpage");
        $http.post("/rest/feedbacks",feedback_info)
            .success(function (data) {
//                if (data !== ""){
//                    window.location.replace("#/clientpage");
//                    $rootScope.slugebkis = JSON.parse(data)
//                    $rootScope.userData = {Id:$scope.user_id, Pass:$scope.user_pass };
                $scope.feedback_name = undefined;
                $scope.feedback_email = undefined;
                $scope.feedback_subject = undefined;
                $scope.feedback_message = undefined;
                alert("Спасибо за вашу заявку, мы свяжемся с Вами в ближайшее время.")
            console.log(data)
                }
//                else{
////                    parol.show();
//                     alert("error");
//                }

            )
            .error(function (data){
                console.log(data)
            });
    }
});
app.controller("loginCtrl", function($scope,$http, $alert, $rootScope) {
    $rootScope.name = {};
    var parol = $alert({
        title: "Невірний пароль",
        //content: 'Best check yo self, you\'re not looking too good.',
        //placement: 'top',
        type: 'danger',
        container : "#error_msg",
        duration : '3',
        show: false
    });
    $scope.login_submit = function user_authorization(){

        var user_info = {name:$scope.user_name, Pass:$scope.user_pass };
        console.log(user_info);
        window.location.replace("#/clientpage");
//        $http.post("http://10.7.131.134/exampleService/UserRegistry2/",user_info)
//
//            .success(function (data) {
//                if (data !== ""){
//                    window.location.replace("#/clientpage");
//                    $rootScope.slugebkis = JSON.parse(data)
//                    $rootScope.userData = {Id:$scope.user_id, Pass:$scope.user_pass };
//                }
//                else{
//                    parol.show();
//                }
//
//            })
//            .error(function (data){
//                console.log(data)
//            });
    }
});
app.controller("clientpageCtrl", function($scope,$http, $alert, $rootScope){
    $scope.user_slugebkis = function(){
        return $rootScope.slugebkis;
    };
    $scope.slugebka_submit = function slugebka_otpravka(kod) {
        var user_info = {Id:$rootScope.userData.Id, kod: kod, status:true};
        console.log(user_info);
        //alert('delete ' + reg_n);
//        $http.post("http://10.7.131.134/exampleService/UserRegistry2/",user_info)
//
//            .success(function (data) {
//                if (data !== "") {
//                    window.location.replace("#/clientpage");
//                    $rootScope.slugebkis = JSON.parse(data)
//                    $rootScope.userData = {Id: $scope.user_id, Pass: $scope.user_pass};
//                    //console.log($rootScope.userData);
//                }
//                else {
//
//                }
//
//            })
//            .error(function (data) {
//                //console.log(user_info)
//                console.log(data)
//            });
    }
    $scope.slugebka_decline = function slugebka_otpravka(kod) {
        var user_info = {Id:$rootScope.userData.Id, kod: kod, status:false};
        console.log(user_info);
//        $http.post("http://10.7.131.134/exampleService/UserRegistry2/",user_info)
//
//            .success(function (data) {
//
//            })
//            .error(function (data) {
//                console.log(data)
//            });
    }
});

app.controller("applyController", function($scope,$http) {
    $scope.applicationSubmit = function(){

        var team_info = {league:"STARTUP", company:$scope.company, website:$scope.website,
        name:$scope.name,telephone:$scope.telephone,email:$scope.email,payed:false,logo:"blob",
        players:[
            {name:$scope.captain.split(' ')[0],surname:$scope.captain.split(' ')[1],role:$scope.captainPost,captain:true},
            {name:$scope.player2.split(' ')[0],surname:$scope.player2.split(' ')[1],role:$scope.player2Post,captain:false},
            {name:$scope.player3.split(' ')[0],surname:$scope.player3.split(' ')[1],role:$scope.player3Post,captain:false},
            {name:$scope.player4.split(' ')[0],surname:$scope.player4.split(' ')[1],role:$scope.player4Post,captain:false}
        ]};
        console.log(team_info);

        $http.post("/rest/teams",team_info)
            .success(function (data) {
//                if (data !== ""){
//                    window.location.replace("#/clientpage");
//                    $rootScope.slugebkis = JSON.parse(data)
//                    $rootScope.userData = {Id:$scope.user_id, Pass:$scope.user_pass };


                console.log(data);
                alert("Спасибо за заявку!");

                //$scope.company=undefined;
                //$scope.website=undefined;
                //$scope.name=undefined;
                //$scope.telephone=undefined;
                //$scope.email=undefined;
                //$scope.captain=undefined;
                //$scope.captainPost=undefined;
                //$scope.player2=undefined;
                //$scope.player2Post=undefined;
                //$scope.player3=undefined;
                //$scope.player3Post=undefined;
                //$scope.player4=undefined;
                //$scope.player4Post=undefined;
            })
            .error(function (data){
                console.log("WRONG")
            });
    }
});