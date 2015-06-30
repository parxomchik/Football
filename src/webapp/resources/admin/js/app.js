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
        .when('/news', {
            templateUrl: 'news.html',
            controller: 'mainCtrl'
        })
        .when('/', {
            templateUrl: 'index.html',
            controller: 'mainCtrl'
        })
        .otherwise({
            redirectTo: '/404'
        });
    //$locationProvider.html5Mode(true);
});
app.controller("mainCtrl", function($scope,$http) {
    //$scope.news = [{
    //    "id":1,
    //    //"author":"Тарас Михалевич",
    //    "header":"Ознакомься со схемой розыгрыша“StartUpFootball3x3Cup”",
    //    "shortDescription":"Немного о подаче заявки, схеме розыгрыша и лигах чемпионата. В чемпионате играется 3 лиги...",
    //    //"active":true,
    //    "date":1435145358001
    //    //"picture":null
    //    },{
    //    "id":2,
    //    //"author":"Тарас Михалевич",
    //    "header":"Ознакомься со схемой розыгрыша“StartUpFootball3x3Cup1”",
    //    "shortDescription":"Немного о подаче заявки, схеме розыгрыша и лигах чемпионата. В чемпионате играется 3 лиги...",
    //    //"active":true,
    //    "date":1435145358002
    //    //"picture":null
    //    },
    //    {
    //        "id":3,
    //    "author":"Тарас Михалевич",
    //    "header":"Ознакомься со схемой розыгрыша“StartUpFootball3x3Cup2”",
    //    "shortDescription":"Немного о подаче заявки, схеме розыгрыша и лигах чемпионата. В чемпионате играется 3 лиги...",
    //    //"active":true,
    //    "date":1435145358003
    //    //"picture":null
    //    }];


    $http.get("/rest/news/active?count=3")
        .success(function (data) {
        $scope.news = data;
        for (var i=0; i<data.length;i++) {
            var tempDate = new Date(data[i].date);
            data[i].date=tempDate.getDate()+"/"+tempDate.getMonth()+"/"+tempDate.getFullYear();
        }
        //$scope.news = {"id":3,"author":"Тарас Михалевич","titleTags":null,"descriptionTags":null,"keywords":null,"header":"Ознакомься со схемой розыгрыша“StartUpFootball3x3Cup”","shortDescription":"Немного о подаче заявки, схеме розыгрыша и лигах чемпионата. В чемпионате играется 3 лиги...","text":"Немного о подаче заявки, схеме розыгрыша и лигах чемпионата. В чемпионате играется 3 лиги – «Startups League» , «Investor League», «IT-Industry League».\n\n«Startups League»  - собиарет 32 команды исключительно от украинских стартапов.\n«Investor League» - собирает 16 команд от украинских и международных венчурных фондов, бизнес-ангелов, инвест банков, Private Equity фондов и бизнес инкубаторов.\n«IT-Industry League» - собирает 64 команды от украинских девелоперов, веб-масетеров, студий веб-дизайна, платежных систем, информационных порталов и других представителей IT индустрии Украины.\n\nДля того, что бы стать участниками чемпионата, обязательно нужно пройти тщательную процедуру регистрации команд. Мы подходим к регистрации команд очень аккуратно и предусмотрительно, так как хотим что бы все игры проходили по принципу Fair-Play и в равных условиях. К чемпионату не допускаются игроки, не являющиеся официальными представителями компании, в которой работают или стартапа, который только выходит или уже вышел на рынок. Правда для Startup League организаторы предоставляют опцию привлечь сразу двух игроков со стороны, в случае, если в команде стартапа только один человек играет в футбол.\nСхема розыгрыша состоит из двух этапов - групповой и play-off.\nНа групповом этапе все команды делятся на группы по 4 команды и играют один круг каждая с каждой. По результату набранных очей на групповом этапе первые два места в группе выходят в Play-off Gold, а третье и четвертое места - в Play-off Silver. \nТаким образом, каждая команда сыграет четыре гарантированных игры - три на групповом этапе и одну на этапе Play-off. Дальше игры  идут на вылет до определения первого, второго и третьего мест.\nКак думаете, до какого этапа дойдет ваша команда?","active":true,"date":1435145358000,"picture":null}
        }
    )
        .error(function (data){
            console.log(data)
        });

$scope.news_readMore = function(new_id){
//console.log(new_id);
//        var news_info = {"id":new_id};
//        console.log(new_id);
        $http.get("/rest/news/"+new_id)
            .success(function (data) {
            console.log(data);
                window.location.replace('#/news.html')
                $scope.currentNews = data;

            }
        )
            .error(function (data){
                console.log(data)
            });
        }
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