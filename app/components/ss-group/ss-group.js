(function () {
    'use strict';
    
    /*global angular, Firebase*/
    angular.module('ssGroup', [
        'ngRoute',
        'ssServicesAuth',
        'firebase'
    ])
        
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/group/create', {
                    templateUrl: 'components/ss-group/ss-group.html',
                    controller: 'GroupController',
                    resolve: {
                        'currentAuth': ['Auth', function (Auth) {
                            return Auth.$requireAuth();
                        }]
                    }
                });
        }])
    
        .controller('GroupController', ['$scope', '$firebase', 'FIREBASE_URL', 'currentAuth', function ($scope, $firebase, FIREBASE_URL, currentAuth) {
            var groupRef = new Firebase(FIREBASE_URL + '/groups'),
                groupSync = $firebase(groupRef),
                userRef = new Firebase(FIREBASE_URL + '/users/' + currentAuth.uid + '/groups'),
                userSync = $firebase(userRef);
            
            $scope.create = function () {
                $scope.group.members = {};
                $scope.group.members[currentAuth.uid] = true;
                
                groupSync.$push($scope.group).then(function (newChildRef) {
                    var group = {};
                    group[newChildRef.key()] = true;
                    
                    userSync.$update(group).then(function () {
                        console.log('done');  
                    });
                });
            };
        }]);
}());