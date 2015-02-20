(function () {
  'use strict';
  
  angular.module('gh.strava.user', [])
  
  .factory('UserFactory', function () {
    var user = {};
    
    return {
      User: user,
      
      setUser: function (data) {
        for (var key in data) user[key] = data[key];
      }
    };
  })
  
  .controller('UserConfigCtrl', [
    '$scope', '$http', 'UserFactory', 
    function ($scope, $http, UserFactory) {
      $scope.User = UserFactory.User;
      $scope.model = {
        hrzones: UserFactory.User.hrZones
      };
      
      $scope.updateUser = function () {
        var httpPostObject = {
          method: 'POST',
          url: '/user/' + UserFactory.User._id + '/updateUser',
          data: $scope.model
        };

        $http(httpPostObject).success(function (data) {
          console.log(data);
        });
      };
    }
  ]);  
})();