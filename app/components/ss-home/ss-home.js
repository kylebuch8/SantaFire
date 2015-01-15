(function () {
    'use strict';
    
    /*global angular, Firebase*/
    angular.module('ssHome', [
        'ngRoute',
        'ssServicesAuth',
        'firebase'
    ])
    
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'components/ss-home/ss-home.html',
                    controller: 'HomeController',
                    resolve: {
                        'data': ['Auth', '$firebase', '$q', 'FIREBASE_URL', function (Auth, $firebase, $q, FIREBASE_URL) {
                            return Auth.$requireAuth().then(function (user) {
                                var deferred = $q.defer(),
                                    ref = new Firebase(FIREBASE_URL),
                                    groupsRef = ref.child('groups'),
                                    indexRef = $firebase(ref.child('users/' + user.uid + '/groups')).$asArray(),
                                    groups = [],
                                    length = 0;
                                
                                indexRef.$loaded().then(function (data) {
                                    var i = 0;
                                    length = indexRef.length;
                                    
                                    if (length === 0) {
                                        deferred.resolve({
                                            'user': user
                                        });
                                    }

                                    for (i; i < length; i += 1) {
                                        groupsRef.child(indexRef[i].$id).once('value', function (dataSnap) {
                                            
                                            groups.push(dataSnap.val());
                                            
                                            if (groups.length === length) {
                                                deferred.resolve({
                                                    'user': user,
                                                    'groups': groups
                                                });
                                            }
                                        });
                                    }
                                });
                                
                                return deferred.promise;
                            });
                        }]
                    }
                });
        }])
    
        .controller('HomeController', ['$scope', 'data', function ($scope, data) {
            $scope.user = data.user;
            $scope.groups = data.groups;
        }]);
}());