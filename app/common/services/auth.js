(function () {
    'use strict';
    
    /*global angular, Firebase*/
    angular.module('ssServicesAuth', ['firebase'])
        .factory('Auth', ['$firebaseAuth', 'FIREBASE_URL', function ($firebaseAuth, FIREBASE_URL) {
            var ref = new Firebase(FIREBASE_URL);
            return $firebaseAuth(ref);
        }]);
}());