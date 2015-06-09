var app = angular.module('mgcrea.ngStrapDocs', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap','ngRoute']);

'use strict';

angular.module('mgcrea.ngStrapDocs');

//app.controller('DatepickerDemoCtrl', function($scope) {
//    $scope.selectedDate = new Date();
//    $scope.getType = function(key) {
//        return Object.prototype.toString.call($scope[key]);
//    };
//
//    $scope.clearDates = function() {
//        $scope.selectedDate = null;
//    };
//});
//app.config(function($datepickerProvider) {
//    angular.extend($datepickerProvider.defaults, {
//        dateFormat: 'dd.MM.yyyy',
//        startWeek: 1
//    });
//})

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
        .when('/features', {
            templateUrl: 'client_page.html',
            controller: 'clientpageCtrl'
        })
        .when('/prices', {
            templateUrl: 'client_page.html',
            controller: 'clientpageCtrl'
        })
        .otherwise({
            redirectTo: '/404'
        });
    //$locationProvider.html5Mode(true);
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
    $scope.logins = {}
//    $http.post("http://10.7.131.134/exampleService/PostWithZero/")
//        .success(function (data) {
//
//            $scope.logins = JSON.parse(data);
//        })
//        .error(function (data)
//        {
//            $scope.error = "SUBMIT ERROR";
//        });
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