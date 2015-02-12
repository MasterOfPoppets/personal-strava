(function () {
  'use strict';
  
  angular.module('gh.strava.oauth', [])
  
  .controller('AuthoriseCtrl', [
    '$scope', '$http', '$window',
    function ($scope, $http, $window) {
      $scope.authorise = function () {
        $http.get('/ConnectWithStrava').success(function (data) {
          console.log(data);
          $window.location.href = data;
        });
      };
    }
  ])
  
  .controller('ExchangeCtrl', [
    '$http', 'code', 
    function ($http, code) {
      console.log(code);
      $http.get('/ExchangeWithStrava?code=' + code);
    }
  ]);  
})();