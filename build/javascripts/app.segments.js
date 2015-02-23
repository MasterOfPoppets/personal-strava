(function () {
  'use strict';

  angular.module('gh.strava.segments', [])

  .controller('SegmentsCtrl', [
    '$scope', '$http',
    function ($scope, $http) {
      $scope.model = {};

      $http.get('/segments').success(function (data) {
        $scope.model.segments = data;
      });
    }
  ]);
})();
