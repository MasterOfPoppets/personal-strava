(function () {
  'use strict';
  
  angular.module('gh.strava.controllers', [])
  
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
      '$scope', '$http', '$stateParams',
      function ($scope, $http, $stateParams) {
        $scope.results = {};
        $scope.myDoughnut = null;
    
        $http.get('/act/hr/' + $stateParams.id).success(function (data) {
          if (Object.keys($scope.results).length === 0) {
            var ctx = document.getElementById('myChart').getContext('2d');

            var chartData = [
              {
                value: parseFloat(data.rest),
                color: '#ffe1e2',
                label: 'Rest'
              },
              {
                value: parseFloat(data.z1),
                color: '#ffbbbd',
                label: 'Zone 1'
              },
              {
                value: parseFloat(data.z2),
                color: '#fc9294',
                label: 'Zone 2'
              },
              {
                value: parseFloat(data.z3),
                color: '#fc6468',
                label: 'Zone 3'
              },
              {
                value: parseFloat(data.z4),
                color: '#f8363a',
                label: 'Zone 4'
              },
              {
                value: parseFloat(data.z5),
                color: '#ef1419',
                label: 'Zone 5'
              }
            ];

            $scope.myDoughnut = new Chart(ctx).Doughnut(chartData);
          } else {
            console.log('Updating existing chart');
            $scope.myDoughnut.segments[0].value = parseFloat(data.rest);
            $scope.myDoughnut.segments[1].value = parseFloat(data.z1);
            $scope.myDoughnut.segments[2].value = parseFloat(data.z2);
            $scope.myDoughnut.segments[3].value = parseFloat(data.z3);
            $scope.myDoughnut.segments[4].value = parseFloat(data.z4);
            $scope.myDoughnut.segments[5].value = parseFloat(data.z5);
            $scope.myDoughnut.update();
          }
        
          $scope.results = data;
        });
      }
    ]);
})();