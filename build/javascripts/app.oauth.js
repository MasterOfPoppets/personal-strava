(function () {
  'use strict';
  
  angular.module('gh.strava.oauth', [])
  
  .controller('AuthoriseCtrl', [
    '$scope', '$http', '$window',
    function ($scope, $http, $window) {
      $scope.authorise = function () {
        $http.get('/oauth/connect').success(function (data) {
          $window.location.href = data;
        });
      };
    }
  ])
  
  .factory('Test', function () {
    var model = {
      avatar: '' 
    };
    
    return {
      avatar: function () {
        return model.avatar; 
      },
      
      setAvatar: function (avatar) {
        model.avatar = avatar; 
      }
    };
  })
  
  .controller('ExchangeCtrl', [
    '$scope', '$http', 'code', 'Test', '$location',
    function ($scope, $http, code, Test, $location) {
      $http.get('/oauth/exchange?code=' + code).success(function (data) {
        Test.setAvatar(data.athlete.profile);
        $location.path('/welcome').search('');
      });
    }
  ])
  
  .controller('WelcomeCtrl', [
    '$scope', 'Test',
    function ($scope, Test) {
      $scope.avatar = Test.avatar();
      console.log('in welcome ctrl');
    }
  ]);  
})();