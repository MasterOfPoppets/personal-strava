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

  .controller('ExchangeCtrl', [
    '$scope', '$http', 'code', 'UserFactory', '$state',
    function ($scope, $http, code, UserFactory, $state) {
      $http.get('/oauth/exchange?code=' + code).success(function (data) {
        console.log(data);
        UserFactory.setUser(data);

        if (data.hrZonesSet) {
          $state.go('dashboard.activities', {
            location: true,
            inherit: false
          });
        } else {
          $state.go('dashboard.userConfig', {
            location: true,
            inherit: false
          });
        }
      });
    }
  ]);
})();
