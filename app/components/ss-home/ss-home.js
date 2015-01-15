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
                                    wishesRef = $firebase(ref.child('wishes/' + user.uid)).$asArray(),
                                    groups = [],
                                    length = 0;
                                
                                $q.all([indexRef.$loaded(), wishesRef.$loaded()]).then(function (result) {
                                    var i = 0,
                                        returnObj = {
                                            'user': user,
                                            'wishes': result[1]
                                        };
                                    length = indexRef.length;
                                    
                                    if (length === 0) {
                                        deferred.resolve(returnObj);
                                    }

                                    for (i; i < length; i += 1) {
                                        groupsRef.child(indexRef[i].$id).once('value', function (dataSnap) {
                                            
                                            groups.push(dataSnap.val());
                                            
                                            if (groups.length === length) {
                                                returnObj.groups = groups;
                                                deferred.resolve(returnObj);
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
            $scope.wishes = data.wishes;
        }]);
}());