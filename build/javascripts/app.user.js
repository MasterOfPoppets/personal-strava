(function () {
  'use strict';
  
  angular.module('gh.strava.user', [])
  
  .factory('UserFactory', function () {
    var user = {};
    
    return {
      User: user,
      
      setUser: function (data) {
        user._id = data._id;
        user.name = data.name;
        user.profile = data.profile;
      }
    };
  })
  
  .controller('UserConfigCtrl', [
    '$scope', '$http', 'UserFactory', 
    function ($scope, $http, UserFactory) {
      $scope.model = {};
      
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