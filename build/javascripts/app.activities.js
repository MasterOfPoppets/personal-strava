(function () {
  'use strict';

  angular.module('gh.strava.activities', [])

  .controller('ActivitiesCtrl', [
    '$scope', '$http',
    function ($scope, $http) {
      $scope.model = {};

      var width = 420,
          barHeight = 20;

      var x = d3.scale.linear()
          .range([0, width]);

      var chart = d3.select('.chart')
          .attr('width', width);

      $scope.elevation = function () {
        test($scope.model.activities, width, barHeight, x, chart, 'total_elevation_gain')
      }

      $scope.distance = function () {
        test($scope.model.activities, width, barHeight, x, chart, 'distance')
      }

      $http.get('/activities').success(function (data) {
        $scope.model.activities = data;

        test(data, width, barHeight, x, chart, 'total_elevation_gain')
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

  function test(data, width, barHeight, x, chart, field) {
    x.domain([0, d3.max(data,
      function(d) {
        return d[field]
      }
    )])

    chart.attr('height', barHeight * data.length);

    var bar = chart.selectAll('g')
        .data(data)

    chart.selectAll('rect')
        .attr('width', function (d) {
          return x(d[field])
        })

    bar.enter().append('g')
        .attr('transform', function (d, i) {
          return 'translate(0,' + i * barHeight + ')'
        })

    bar.append('rect')
        .attr('width', function (d) {
          return x(d[field])
        })
        .attr('height', barHeight - 1)

    bar.append('text')
        .attr('x', function (d) {
          return x(d[field]) - 3
        })
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function (d) {
          return d.name
        })
  }
})();
