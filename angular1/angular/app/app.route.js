
var app = angular.module("app.route", ['ngRoute']);

app.config(function ($routeProvider) {   

    $routeProvider
        .when('/', {
            templateUrl: "views/allLibraries.html",
            controller: "AllLibrariesController",
            controllerAs: "vm"
        })
        .when('/AllLibraries', {
            templateUrl: "views/allLibraries.html",
            controller: "AllLibrariesController",
            controllerAs: "vm"
        })
        .when('/FindBooks', {
            templateUrl: "views/findBooks.html",
            controller: "FindBooksController",
            controllerAs: "vm"
        });  
     
});

