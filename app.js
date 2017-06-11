var app = angular.module("myApp", ['ngRoute', 'firebase']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/", {
            templateUrl: "bakery/bakery.html",
            controller: "bakeryController"
        })
        .when("/bakery", {
            templateUrl: "bakery/bakery.html",
            controller: "bakeryController"
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
});

app.controller('navController', function($scope, $location) {
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});