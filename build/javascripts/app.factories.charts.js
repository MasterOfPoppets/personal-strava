(function () {
  'use strict';
  
  angular.module('gh.strava.factories.charts', [])
  
    .factory('DoughnutFactory', function () {
      return {
        draw: function (chart, data) {
          if (chart.doughnut === null) {
            chart.doughnut = new Chart(chart.ctx).Doughnut(data);
          } else {
            for (var i = 0; i < Object.keys(chart.data).length; i++) {
              chart.doughnut.segments[i].value = data[i].value;
            }
          }
        }
      };
    });
}());