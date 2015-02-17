(function () {
  'use strict';
  
  angular.module('gh.strava.user', [])
  
  .factory('UserFactory', function () {
    var user = {};
    
    return {
      User: user,
      
      setUser: function (data) {
        user.name = data.name;
        user.profile = data.profile;
      }
    };
  })
  
  .controller('UserConfigCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.model = {
      hrzones: {
        z1: null
      }
    };
    
    $scope.updateUser = function () {
      var httpPostObject = {
        method: 'POST',
        url: '/user/updateUser',
        data: $scope.model
      };

      $http(httpPostObject).success(function (data) {
        console.log(data);
      });
    };
  }]);  
})();