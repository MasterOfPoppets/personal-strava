(function () {
  'use strict';
  
  angular.module('gh.strava', [
    'ui.router', 'gh.strava.user', 'gh.strava.oauth', 'gh.strava.dashboard',
    'gh.strava.activities', 'gh.strava.segments'
  ])
  
  .config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
      $stateProvider
      .state('authorise', {
        url: '/',
        templateUrl: 'partials/oauth',
        controller: 'AuthoriseCtrl'
      })
      .state('exchange', {
        url: '/exchange?state&code',
        resolve: {
          code: ['$stateParams', function ($stateParams) {
            return $stateParams.code;
          }]
        },
        controller: 'ExchangeCtrl'
      })
      .state('dashboard', {
        abstract: true,
        templateUrl: 'partials/dashboard',
        controller: 'DashboardCtrl',
        onEnter: function () {
          console.log('entered dashboard abstract state'); 
        }
      })
      .state('dashboard.userConfig', {
        url: '/user',
        templateUrl: 'partials/userConfig',
        controller: 'UserConfigCtrl'
      })
      .state('dashboard.activities', {
        url: '/activities',
        templateUrl: 'partials/activities',
        controller: 'ActivitiesCtrl'
      })
      .state('dashboard.activity', {
        url: '/activities/:id',
        templateUrl: 'partials/activity',
        controller: 'ActivityCtrl'
      })
      .state('dashboard.segments', {
        url: '/segments',
        templateUrl: 'partials/segments',
        controller: 'SegmentsCtrl'
      });
    }
  ]);
})();