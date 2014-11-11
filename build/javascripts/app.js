(function () {
  'use strict';
  
  angular.module('gh.strava', ['gh.strava.controllers', 'ui.router'])
  
    .config([
      '$stateProvider', '$urlRouterProvider', '$locationProvider',
      function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/activities');
        $locationProvider.html5Mode(true);
        $stateProvider
        .state('activities', {
          url: '/activities',
          templateUrl: 'partials/activities',
          controller: 'ActivitiesCtrl'
        })
        .state('activities.hr', {
          url: '/hr/{id}',
          templateUrl: function ($stateParams) {
            return 'partials/activities/hr/' + $stateParams.id;
          },
          controller: 'ActivitiesHRCtrl'
        });
      }
    ]);
})();