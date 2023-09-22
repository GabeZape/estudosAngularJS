// MODULE
var angularApp = angular.module('angularApp', ['ngMessages', 'ngResource', 'ngRoute']);

angularApp.config(function($routeProvider) {
    $routeProvider

    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })

    .when('/second', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'

    })
})

angularApp.service('nameService', function() {
    var self = this
    this.name = 'John Doe'
    this.namelength = function () {
        return self.name.length
    }
})

// CONTROLLERS
angularApp.controller('mainController', ['$scope', '$log',  function ($scope, $log) {
    $scope.people = [
        {
        name: 'John Doe',
        address: '555 Main St.',
        city: ' New York',
        state: 'NY',
        zip: '11111'
    },
    {
        name: 'Jane Doe',
        address: '666 Second St.',
        city: ' New Jersey',
        state: 'NY',
        zip: '2222'
    },
    {
        name: 'Drake Josh',
        address: '777 Left St.',
        city: ' Miami',
        state: 'Florida',
        zip: '33333'
    }
]

    $scope.formattedAddress = function(person) {
        return `${person.address}, ${person.city}, ${person.state}, ${person.zip}`
    }
    
    /*$scope.$watch('name', function() {
        nameService.name = $scope.name
    })
    $log.log(nameService.name)
    $log.log(nameService.namelength())
    a.handle = ''
    a.lowercasehandle = function () {
        return d ('lowercase')(a.handle)
    }
    a.$watch('handle', function(newValue, oldValue) {
        console.info('Changed')
        console.log('Old: ' + oldValue)
        console.log('New: ' + newValue)
    })
    a.characters=5
    a.rules = [
    {rulename: "Must be 5 characters"},
    {rulename: "Must not be used elsewhere"},
    {rulename: "Must be cool"}
    ]
    e.get('https://api.kanye.rest')
        .success(function(result) {
            a.rules = result
            console.log(result)
        }) 
        .error(function(data, status) {
            console.log(data)
        })*/

}])
angularApp.controller('secondController', ['$scope', '$log','$routeParams', function ($scope, $log, $routeParams){
    $scope.name = nameService.name
    $scope.$watch('name', function() {
        nameService.name = $scope.name
    })
}])

angularApp.directive("searchResult", function() {
    return {
        restrict: 'AECM',
        templateUrl: 'directives/searchresult.html',
        replace: true,
        scope: {
            //personName: '@',
            personObject: '=',
            formattedAddressFunction: "&"
            },
            transclude: true
        /*compile: function(elem, attrs) {
            console.log('Compiling...')
            //elem.removeAttr('class')
            console.log(elem)
            return*/ 
            /*link: {
                post: function(scope, elements, attrs) {
                    console.log('Post-linking...')
                    console.log(scope)
                    if (scope.personObject.name == 'Jane Doe') {
                        elements.removeAttr('class')
                    }
                    console.log(elements)
                }
            }*/
    }
})