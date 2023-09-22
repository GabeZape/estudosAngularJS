//Module
var myApp = angular.module('myApp', ['ngRoute', 'ngResource'])

//ROUTES
myApp.config(function($routeProvider){
    $routeProvider

    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })

    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller:'forecastController'
    })
})

//Services
    myApp.service('cityService', function() {
        this.city = "Joinville"
    })
//CONTROLLERS
myApp.controller('mainController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService){
    $scope.city = cityService.city
    $scope.$watch('city', function(){
        cityService.city = $scope.city
    })
    
}])

myApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService){
    $scope.city = cityService.city

    $scope.weatherAPI = $resource('https://api.openweathermap.org/data/2.5/weather?', {
        callback: "JSON_CALLBACK"}, {get: { method: "JSONP"}
    })
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, APPID:'53657aacce29a9567e415713302717cf'})

    $scope.convertToCelsius = function(degK) {
        return Math.round((degK - 273))
    }

    $scope.convertToDate = function(dt) {
        return new Date(dt*1000)
    }

    $scope.$watch('city', function(){
        cityService.city = $scope.city
    })
}])