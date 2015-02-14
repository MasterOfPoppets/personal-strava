(function () {
  'use strict';
  
  angular.module('gh.strava', [
    'ui.router', 'gh.strava.user', 'gh.strava.oauth', 'gh.strava.dashboard'
  ])
  
  .config([
    '$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
      $stateProvider
      .state('authorise', {
        url: '/',
        templateUrl: 'partials/authorise',
        controller: 'AuthoriseCtrl'
      })
      .state('exchange', {
        url: '/exchange?state&code',
        controller: 'ExchangeCtrl',
        resolve: {
          code: ['$stateParams', function ($stateParams) {
            return $stateParams.code;
          }]
        }
      })
      .state('dashboard', {
        abstract: true,
        templateUrl: 'partials/dashboard',
        controller: 'DashboardCtrl'
      })
      .state('dashboard.userConfig', {
        url: '/dashboard',
        views: {
          'menu': {
            templateUrl: 'partials/menu'
          },
          'content': {
            templateUrl: 'partials/userConfig'
          }
        }
      })
      .state('dashboard.activities', {
        url: '/dashboard',
        views: {
          'menu': {
            templateUrl: 'partials/menu'
          },
          'content': {
            templateUrl: 'partials/activities'
          }
        }
      });
    }
  ]);
})();