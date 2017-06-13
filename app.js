var app = angular.module("myApp", ['ngRoute', 'firebase']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/", {
            templateUrl: "bakerytype/bakerytype.html",
            controller: "bakerytypeController"
        })
        .when("/bakery", {
            templateUrl: "bakery/bakery.html",
            controller: "bakeryController"
        })
        .when("/bakerytype", {
            templateUrl: "bakerytype/bakerytype.html",
            controller: "bakerytypeController"
        })
        .when("/page1", {
            templateUrl: "page1/page1.html",
            controller: "page1Controller"
        })
        .when("/page2", {
            templateUrl: "page2/page2.html",
            controller: "page2Controller"
        });
});

app.service('bmidatajson', function($http, $q, $firebaseArray) {
    this.getData = function() {
        var deferred = $q.defer();
        $http.get('https://www.appstudio.space/angularjs/workshop/api/bmidata.php')
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }

    this.getDataFromFirebase = function() {
        var ref = firebase.database().ref().child("bmidata");
        return $firebaseArray(ref);
    }
});

app.service('FBoperation', function($http, $q, $firebaseArray) {
    this.getData = function(tablename) {
        var ref = firebase.database().ref().child(tablename);
        return $firebaseArray(ref);
    }
});


app.service('DBoperation', function($http, $q) {
    this.getData = function(tablename) {
        var deferred = $q.defer();
        $http.get('https://www.appstudio.space/angularjs/workshop/api/dboperation.php?table=' + tablename)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.editData = function(tablename, primarykey, id) {
        var deferred = $q.defer();
        $http.get('https://www.appstudio.space/angularjs/workshop/api/dboperation.php?table=' + tablename + '&' + primarykey + '=' + id + '&primarykey=' + primarykey)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.addData = function(data) {
        var deferred = $q.defer();
        $http.post('https://www.appstudio.space/angularjs/workshop/api/dboperation.php', data)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.deleteData = function(data) {
        var deferred = $q.defer();
        $http.post('https://www.appstudio.space/angularjs/workshop/api/dboperation.php', data)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
    this.updateData = function(data) {
        var deferred = $q.defer();
        $http.post('https://www.appstudio.space/angularjs/workshop/api/dboperation.php', data)
            .then(function(response) {
                deferred.resolve(response.data);
            })
            .catch(function(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
});

app.filter('changeKeytoText', function() {
    return function(tmp, data) {
        for (i = 0; i < data.length; i++) {
            if (data[i].id == tmp) {
                return data[i].name;
            }
        }
    }
});


app.controller('navController', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});