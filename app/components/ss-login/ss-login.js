(function () {
    'use strict';
    
    /*global angular, Firebase*/
    angular.module('ssLogin', [
        'ngRoute',
        'ssServicesUser'
    ])
    
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/login', {
                    templateUrl: 'components/ss-login/ss-login.html',
                    controller: 'LoginController',
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {
                            return Auth.$getAuth();
                        }]
                    }
                });
        }])
    
        .controller('LoginController', [
            '$scope',
            '$location',
            'User',
            'FIREBASE_URL',
            'currentAuth',
            function ($scope, $location, User, FIREBASE_URL, currentAuth) {
                var ref = new Firebase(FIREBASE_URL);

                if (currentAuth) {
                    $location.path('/home');
                    return;
                }

                $scope.login = function () {
                    ref.authWithOAuthPopup('google', function (error, authData) {
                        if (error) {
                            return;
                        } else {
                            User.saveUser(authData).then(function () {
                                $location.path('/home');
                            });
                        }
                    });
                };
            }]);
}());