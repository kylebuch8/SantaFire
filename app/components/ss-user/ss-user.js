(function () {
    'use strict';
    
    /*global angular, Firebase*/
    angular.module('ssUser', [
        'ngRoute',
        'ssServicesAuth',
        'firebase'
    ])
    
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/user/:id', {
                    templateUrl: 'components/ss-user/ss-user.html',
                    controller: 'UserController',
                    resolve: {
                        'user': ['Auth', 'FIREBASE_URL', '$route', '$firebase', function (Auth, FIREBASE_URL, $route, $firebase) {
                            return Auth.$requireAuth().then(function () {
                                var ref = new Firebase(FIREBASE_URL + '/users/' + $route.current.params.id),
                                    sync = $firebase(ref),
                                    user = sync.$asObject();
                                
                                return user.$loaded();
                            });
                        }]
                    }
                });
        }])
    
        .controller('UserController', ['$scope', 'user', function ($scope, user) {
            $scope.user = user;
        }]);
}());