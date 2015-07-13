var app = angular.module('mgcrea.ngStrapDocs', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap', 'ngRoute', 'summernote']);

'use strict';

angular.module('mgcrea.ngStrapDocs');

app.config(function ($routeProvider) {
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
        //.when('/news', {
        //    templateUrl: 'news.html',
        //    controller: 'mainCtrl'
        //})
        //.when('/', {
        //    templateUrl: 'index.html',
        //    controller: 'mainCtrl'
        //})
        .when('/clientpage/news/news_add', {
            templateUrl: 'news_add.html',
            controller: 'news_addCtrl'
        })

        .otherwise({
            redirectTo: '/404'
        });
    //$locationProvider.html5Mode(true);
});

app.controller("mainCtrl", function ($scope, $http, $sce) {

    $http.get("/rest/news/active?count=3")
        .success(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].shortDescription = $sce.trustAsHtml(data[i].shortDescription);
                data[i].picture = "data:image/jpeg;base64," + data[i].picture;
            }
            $scope.news = data;
        })
        .error(function (data) {
            console.log(data)
        });

    $scope.news_readMore = function (new_id) {
        window.location.assign('/news.html' + '?id=' + new_id)
    }

    $scope.feedback_submit = function () {

        var feedback_info = {
            name: $scope.feedback_name,
            email: $scope.feedback_email,
            subject: $scope.feedback_subject,
            message: $scope.feedback_message
        };

        $http.post("/rest/feedbacks", feedback_info)
            .success(function (data) {

                $scope.feedback_name = undefined;
                $scope.feedback_email = undefined;
                $scope.feedback_subject = undefined;
                $scope.feedback_message = undefined;
                $scope.feedbackForm.$setPristine();

                alertify.alert("Спасибо за вашу заявку, мы свяжемся с Вами в ближайшее время.", function () {
                    alertify.message('OK');
                });

            })
            .error(function (data) {
            });
    }
});

app.controller("newsPageCtrl", function ($scope, $http, $sce) {
    var newsId = parseInt(window.location.href.split("=")[1]);
    $http.get("/rest/news/active/" + newsId)
        .success(function (data) {
            data.text = $sce.trustAsHtml(data.text);
            data.picture = "data:image/jpeg;base64," + data.picture;
            $scope.currentNews = data;
        }
    )
    var newsIdList;
    $http.get("/rest/news/activeIds")
        .success(function (data) {
            newsIdList = data;
        }
    )


    $scope.nextNews = function () {

        for (var i=0; i<newsIdList.length; i++) {
            if (newsIdList[i]===newsId) {
                if (i>=newsIdList.length-1) {
                    window.location.assign('/news.html' + '?id=' + newsIdList[0]);
                } else {
                    window.location.assign('/news.html' + '?id=' + newsIdList[i+1]);
                }
                break;
            }
        }
    };
    $scope.prevNews = function () {
        for (var i=0; i<newsIdList.length; i++) {
            if (newsIdList[i]===newsId) {
                if (i==0) {
                    window.location.assign('/news.html' + '?id=' + newsIdList[newsIdList.length-1]);
                } else {
                    window.location.assign('/news.html' + '?id=' + newsIdList[i-1]);
                }
                break;
            }
        }
    };

});

app.controller("loginCtrl", function ($scope, $http, $alert, $rootScope) {
    $rootScope.name = {};
    var parol = $alert({
        title: "Невірний пароль",
        type: 'danger',
        container: "#error_msg",
        duration: '3',
        show: false
    });
    $scope.login_submit = function user_authorization() {

        var user_info = {name: $scope.user_name, Pass: $scope.user_pass};
        console.log(user_info);
        window.location.assign("#/clientpage");
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

app.controller("feedbackCtrl", function ($scope, $http) {
    $http.get("/rest/feedbacks/notProcessed")
        .success(function (data) {
            $scope.feedbacks = data;
        }
    );

    $scope.processFeedback = function (id) {
        for (var i = 0; i < $scope.feedbacks.length; i++) {
            if ($scope.feedbacks[i].id == id) {
                var feedback_info = $scope.feedbacks[i];
                feedback_info.processed = true;
            }
        }

        $http.put("/rest/feedbacks/" + id, feedback_info)
            .success(function (data) {
                alert("ok");
                $http.get("/rest/feedbacks/notProcessed")
                    .success(function (data) {
                        $scope.feedbacks = data;
                    }
                );
            })
            .error(function () {
            });
    }
});

app.controller("teamsCtrl", function ($scope, $http) {
    $http.get("/rest/teams")
        .success(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].logo = "data:image/jpeg;base64," + data[i].logo;
            }
            $scope.teams = data;
        })
    $scope.setPaymentStatus = function (id) {
        $http.put("/rest/teams/payment/" + id, "true")
            .success(function (data) {
                for (var i = 0; i < $scope.teams.length; i++) {
                    if ($scope.teams[i].id == id) {
                        $scope.teams[i].payed = true;
                    }
                }
            })
            .error(function () {
            });
    }
});

app.controller("news_addCtrl", function ($scope, $http, $location) {
    $scope.addNews = {}

    $scope.addNewsSubmit = function () {
        $scope.addNews.picture = imgData.split(',')[1];
        $scope.addNews.active = true;
        $http.post("/rest/news/", $scope.addNews)
            .success(function (data) {
                alert("Success");
                $location.path("/clientpage/news");
            })
            .error(function (data) {
            });
    }
});

app.controller("news_editCtrl", function ($scope, $http) {
    var newsId = window.location.href.split("=")[1]
    $http.get("/rest/news/" + newsId)
        .success(function (data) {
            data.picture = "data:image/jpeg;base64," + data.picture;
            $scope.news = data;
        }
    );

    $scope.editNewsSubmit = function (id) {
        var newsEditData = $scope.news;
        newsEditData.picture = newsEditData.picture.split(',')[1];
        $http.put("/rest/news/" + id, newsEditData)
            .success(function (data) {

            })
            .error(function () {
                console.log("WRONG")
            });
    }
});

app.controller("newsCtrl", function ($scope, $http, $sce, $location) {
    $http.get("/rest/news")
        .success(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].shortDescription = $sce.trustAsHtml(data[i].shortDescription);
                data[i].picture = "data:image/jpeg;base64," + data[i].picture;
            }
            $scope.news = data;
        }
    );
    $scope.addNews = function () {
        window.location.assign("#/clientpage/news/news_add");
    }
    $scope.deleteNews = function (id) {
        $http.delete("/rest/news/" + id)
            .success(function () {
                alert("Succesfully deleted");
                $location.path("/clientpage/news");
            })
            .error(function (data) {
                console.log(data);
            }
        )
    }
    $scope.newsEdit = function (id) {
        window.location.assign("#/clientpage/news/news_edit" + '?id=' + id);
    }
});

app.controller("clientpageCtrl", function ($scope, $http, $alert, $rootScope) {

});

app.controller("applyController", function ($scope, $http) {
    var league = window.location.toString().split("=")[1].toUpperCase()
    switch (league) {
        case "STARTUP":
            $scope.leagueName = "START-UP";
            break;
        case "INVESTOR":
            $scope.leagueName = "INVESTOR";
            break;
        case "ITINDUSTRY":
            $scope.leagueName = "IT-INDUSTRY";
            break;
        default :
            $scope.leagueName = "START-UP";
    }

    $scope.applicationSubmit = function () {
        var team_info = {
            league: league,
            company: $scope.company,
            website: $scope.website,
            name: $scope.name,
            telephone: $scope.telephone,
            email: $scope.email,
            payed: false,
            logo: imgData.split(',')[1],
            players: [
                {
                    name: $scope.captain.split(' ')[0],
                    surname: $scope.captain.split(' ')[1],
                    role: $scope.captainPost,
                    captain: true
                },
                {
                    name: $scope.player2.split(' ')[0],
                    surname: $scope.player2.split(' ')[1],
                    role: $scope.player2Post,
                    captain: false
                },
                {
                    name: $scope.player3.split(' ')[0],
                    surname: $scope.player3.split(' ')[1],
                    role: $scope.player3Post,
                    captain: false
                },
                {
                    name: $scope.player4.split(' ')[0],
                    surname: $scope.player4.split(' ')[1],
                    role: $scope.player4Post,
                    captain: false
                }
            ]
        };

        $http.post("/rest/teams", team_info)
            .success(function (data) {
                alertify.alert("Спасибо за вашу заявку, мы свяжемся с Вами в ближайшее время.", function () {
                    alertify.message('OK');
                }).set('onok', function (closeEvent) {
                    window.location.assign("./index.html");
                });
            })
            .error(function (data) {
                console.log("WRONG")
            });
    }
});


//********************* DO NOT EDIT****************************

//click imitation on file loader
function fileLoaderClickImitation() {
    document.getElementById("inputFileToLoad").click();
}

var imgData = "";
//function to upload image
function encodeImageFileAsURL(id) {

    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            imgData = srcData.toString();
            switch (id) {
                case 'applyImgLoader':
                    $("#applyImgLoader").css({
                        'background-image': 'url(' + imgData + ')',
                        'background-size': '100% 100%'
                    });
                    break;
                case 'newsImgLoader':
                    var newImage = document.createElement('img');
                    newImage.src = srcData;
                    $("#newsImgLoader").html("<img src='" + srcData + "' alt='News image'/>");
                    break;
                default :
                    ;
            }
        }
        fileReader.readAsDataURL(fileToLoad);

    }
}
//**********************************************************
