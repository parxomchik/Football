var app = angular.module('mgcrea.ngStrapDocs', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap','ngRoute']);

'use strict';

angular.module('mgcrea.ngStrapDocs');

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login_page.html',
            controller: 'loginCtrl'
        })
        .when('/clientpage', {
            templateUrl: 'client_page.html',
            controller: 'clientpageCtrl'
        })
        .otherwise({
            redirectTo: '/404'
        });
    //$locationProvider.html5Mode(true);
});
app.controller("mainCtrl", function($scope,$http, $alert) {
        $scope.feedback_submit = function(){

        var feedback_info = {name:$scope.feedback_name, email:$scope.feedback_email, subject:feedback_subject, message:feedback_message};
        console.log(feedback_info);
//        window.location.replace("#/clientpage");
        $http.post("http://127.0.0.1/rest/feedbacks",feedback_info)
            .success(function (data) {
//                if (data !== ""){
//                    window.location.replace("#/clientpage");
//                    $rootScope.slugebkis = JSON.parse(data)
//                    $rootScope.userData = {Id:$scope.user_id, Pass:$scope.user_pass };
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