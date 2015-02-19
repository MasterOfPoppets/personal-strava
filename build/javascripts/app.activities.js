(function () {
  'use strict';
  
  angular.module('gh.strava.activities', [])
  
  .controller('ActivitiesCtrl', [
    '$scope', '$http', 
    function ($scope, $http) {
      $scope.model = {};

      $http.get('/activities').success(function (data) {
        $scope.model.activities = data;
      });
    }
  ])
  
  .controller('ActivityCtrl', [
    '$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
      var httpGetObject = {
        method: 'GET',
        url: '/activities/' + $stateParams.id
      };
      
      $http(httpGetObject).success(function (data) {
        console.log(data);
      });
    }
  ]);
})();