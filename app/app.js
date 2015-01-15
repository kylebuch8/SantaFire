(function () {
    'use strict';
    
    /*global angular*/
    angular.module('secretSanta', [
        'ssSplash',
        'ssLogin',
        'ssHome',
        'ssUser',
        'ssGroup',
        'ssWish'
    ])
    
        .constant('FIREBASE_URL', 'https://wa-secret-santa.firebaseio.com/')
    
        .run(['$rootScope', '$location', function ($rootScope, $location) {
            $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
                if (error === 'AUTH_REQUIRED') {
                    $location.path('/login');
                }
            });
        }]);
}());