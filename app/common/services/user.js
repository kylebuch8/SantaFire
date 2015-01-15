(function () {
    'use strict';
    
    /*global angular, Firebase*/
    angular.module('ssServicesUser', ['firebase'])
        .factory('User', ['$q', 'FIREBASE_URL', function ($q, FIREBASE_URL) {
            function saveUser(authData) {
                var ref = new Firebase(FIREBASE_URL),
                    deferred = $q.defer();
                
                if (!authData) {
                    deferred.reject();
                }
                
                ref.child('users').child(authData.uid).set(authData, function () {
                    deferred.resolve();
                });
                
                return deferred.promise;
            }
            
            return {
                saveUser: saveUser
            };
        }]);
}());