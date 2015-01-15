(function () {
    'use strict';
    
    /*global angular*/
    angular.module('ssSplash', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'components/ss-splash/ss-splash.html',
                    controller: 'SplashController'
                });
        }])
    
        .controller('SplashController', ['$timeout', '$location', function ($timeout, $location) {
            $timeout(function () {
                $location.path('/login');
            }, 1500);
        }]);
}());