var app = angular.module('mgcrea.ngStrapDocs', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap', 'ngRoute', 'summernote', 'app.services']);

'use strict';

angular.module('mgcrea.ngStrapDocs');

app.config(function ($routeProvider, $httpProvider) {
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
}).run(function($rootScope, $location, $http) {
    $rootScope.isAdmin = function() {

        if ($rootScope.user === undefined) {
            return false;
        }

        if ($rootScope.user.role === undefined) {
            return false;
        }

        return true;
    };

    $rootScope.logout = function() {
        delete $rootScope.user;
        $location.path("/home");
    }

    /* Try getting valid user from cookie or go to login page */
    //var originalPath = $location.path();
    //$location.path("#/home");
    //
    //    $http.get('/rest/user')
    //        .success(function(user) {
    //            $rootScope.user = user;
    //            $location.path(originalPath);
    //        });
    $rootScope.initialized = true;
});

var services = angular.module('app.services', ['ngResource']);

services.factory('UserService', function($resource) {
    return $resource('/rest/user/:action', {},
        {
            authenticate: {
                method: 'POST',
                params: {'action' : 'authenticate'},
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            },
            get: {
                method:'GET'
            }
        }
    );
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

        for (var i = 0; i < newsIdList.length; i++) {
            if (newsIdList[i] === newsId) {
                if (i >= newsIdList.length - 1) {
                    window.location.assign('/news.html' + '?id=' + newsIdList[0]);
                } else {
                    window.location.assign('/news.html' + '?id=' + newsIdList[i + 1]);
                }
                break;
            }
        }
    };
    $scope.prevNews = function () {
        for (var i = 0; i < newsIdList.length; i++) {
            if (newsIdList[i] === newsId) {
                if (i == 0) {
                    window.location.assign('/news.html' + '?id=' + newsIdList[newsIdList.length - 1]);
                } else {
                    window.location.assign('/news.html' + '?id=' + newsIdList[i - 1]);
                }
                break;
            }
        }
    };

});

app.controller("loginCtrl", function ($scope, $rootScope, $location, $http, UserService) {
    var request= {
        method: 'POST',
        url:'/rest/user/authenticate',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
        data: $.param({username: $scope.username, password: $scope.password})
    }

    $scope.login = function() {
        UserService.authenticate($.param({username: $scope.username, password: $scope.password}), function(user) {
            $rootScope.user = user;
            console.log($rootScope.user);
            $location.path("/clientpage");
        });
    };
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

app.controller("news_editCtrl", function ($scope, $http, $location) {
    var newsId = window.location.href.split("=")[1]
    $http.get("/rest/news/" + newsId)
        .success(function (data) {
            data.picture = "data:image/jpeg;base64," + data.picture;
            $scope.news = data;
        }
    );

    $scope.editNewsSubmit = function (id) {
        var newsEditData = $scope.news;
        if (imgData == "") {
            newsEditData.picture = newsEditData.picture.split(',')[1];
        } else {
            newsEditData.picture = imgData.split(',')[1];
        }
        $http.put("/rest/news/" + id, newsEditData)
            .success(function (data) {
                alert("Success");
                $location.path("/clientpage/news");
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
        $location.path("/clientpage/news/news_add");
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
    $scope.changeActiveStatus = function (id) {
        for (var i = 0; i < $scope.news.length; i++) {
            if ($scope.news[i].id == id) {
                var newsEntry = $scope.news[i];
                newsEntry.picture = newsEntry.picture.split(',')[1];
                newsEntry.shortDescription = $sce.getTrustedHtml(newsEntry.shortDescription);
                $http.put("/rest/news/" + id, newsEntry)
                    .success(function (data) {
                        alert("Active status is " + data.active + " now.");
                        newsEntry.picture = "data:image/jpeg;base64," + newsEntry.picture;
                        newsEntry.shortDescription = $sce.trustAsHtml(newsEntry.shortDescription);
                    })
                    .error(function () {
                        console.log("wrong");
                        newsEntry.picture = "data:image/jpeg;base64," + newsEntry.picture;
                        newsEntry.shortDescription = $sce.trustAsHtml(newsEntry.shortDescription);
                    })

                break;
            }
        }

    }
});

app.controller("clientpageCtrl", function ($scope, $http, $alert, $rootScope) {

});

app.controller("applyController", function ($scope, $http) {
    var league = window.location.toString().split("=")[1].toUpperCase();
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

    $scope.cursorLoading=false;

    $scope.applicationSubmit = function () {
        $scope.cursorLoading=true;
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
                $scope.cursorLoading=false;
                alertify.alert("Спасибо за вашу заявку, мы свяжемся с Вами в ближайшее время.", function () {
                    alertify.message('OK');
                }).set('onok', function (closeEvent) {
                    window.location.assign("./index.html");
                });
            })
            .error(function (data) {
                $scope.cursorLoading=false;
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
                    $("#newsImgLoader").html("<img src='" + srcData + "' width='800' height='600' alt='News image'/>");
                    break;
                case 'newsEditImgLoader':
                    $("#newsEditImgLoader").attr("src", srcData);
                    break;
                default :
                    ;
            }
        }
        fileReader.readAsDataURL(fileToLoad);

    }
}
//**********************************************************
