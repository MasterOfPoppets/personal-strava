(function () {
  'use strict';
  
  angular.module('gh.strava.dashboard', [])
  
  .controller('DashboardCtrl', [
    '$scope', 'UserFactory',
    function ($scope, UserFactory) {
      $scope.avatar = UserFactory.avatar();
    }
  ]);  
})();