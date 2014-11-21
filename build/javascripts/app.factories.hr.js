(function () {
  'use strict';
  
  angular.module('gh.strava.factories.hr', [])
  
    .factory('HRStreamFactory', ['$http', function ($http) {
      return {
        processHRStream: function (route, next) {
          $http.get(route).success(function (data) {
            if (Object.keys(data).length === 0) {
              next({});
            } else {
              next([
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
              ]);
            }
          });
        }
      };
    }]);
}());