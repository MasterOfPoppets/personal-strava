(function () {
  'use strict';
  
  angular.module(
    'gh.strava.controllers', 
    [
      'gh.strava.factories.hr',
      'gh.strava.factories.charts'
    ]
  )
  
    .controller('ActivitiesCtrl', [
      '$scope', '$http', 
      function ($scope, $http) {
        $scope.model = {
          activities: []
        };
        
        $http.get('/act/1').success(function (data) {
          $scope.model.activities = data;
        });
      }
    ])
  
    .controller('ActivitiesHRCtrl', [
      '$scope', '$stateParams', 'HRStreamFactory', 'DoughnutFactory',
      function ($scope, $stateParams, HRStreamFactory, DoughnutFactory) {
        $scope.chart = {
          ctx: document.getElementById('myChart').getContext('2d'),
          doughnut: null
        };
        
        HRStreamFactory.processHRStream(
          '/act/hr/' + $stateParams.id, 
          function (data) {
            if (Object.keys(data).length === 0) {
              console.log('No heart rate data for this activity');
            } else {
              DoughnutFactory.draw($scope.chart, data);
            }
          }
        );
      }
    ]);
})();