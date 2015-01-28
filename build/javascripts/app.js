(function () {
  'use strict';
  
  angular.module('gh.strava', ['gh.strava.controllers', 'ui.router'])
  
  .config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
      $stateProvider
      .state('activities', {
        url: '/activities',
        templateUrl: 'partials/activities',
        controller: 'ActivitiesCtrl'
      })
      .state('activities.hr', {
        url: '/hr/{id}',
        templateUrl: ['$stateParams', function ($stateParams) {
          return 'partials/activities/hr/' + $stateParams.id;
        }],
        controller: 'ActivitiesHRCtrl'
      })
      .state('authorise', {
        url: '/',
        templateUrl: 'partials/authorise',
        controller: 'AuthoriseCtrl'
      })
      .state('exchange', {
        url: '/exchange?state&code',
        templateUrl: 'partials/exchange',
        controller: 'ExchangeCtrl',
        resolve: {
          code: ['$stateParams', function ($stateParams) {
            return $stateParams.code;
          }]
        }
      });
    }
  ]);
})();