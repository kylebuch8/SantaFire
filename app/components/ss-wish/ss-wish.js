(function () {
    'use strict';
    
    /*global angular, Firebase*/
    angular.module('ssWish', [
        'ngRoute',
        'firebase',
        'ssServicesAuth'
    ])
    
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/wish', {
                    templateUrl: 'components/ss-wish/ss-wish.html',
                    controller: 'WishController',
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                });
        }])
    
        .controller('WishController', ['$scope', '$firebase', 'FIREBASE_URL', 'currentAuth', function ($scope, $firebase, FIREBASE_URL, currentAuth) {
            var ref = new Firebase(FIREBASE_URL + '/wishes/' + currentAuth.uid),
                sync = $firebase(ref);
            
            $scope.create = function () {
                sync.$push($scope.wish).then(function (newChildRef) {
                    console.log('Done');
                });
            };
        }]);
}());