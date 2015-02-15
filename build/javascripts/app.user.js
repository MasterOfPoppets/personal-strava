(function () {
  'use strict';
  
  angular.module('gh.strava.user', [])
  
  .factory('UserFactory', function () {
    var user = {
      accessToken: null,
      athlete: {}
    };
    
    return {
      User: user,
      
      setUser: function (data) {
        user.accessToken = data.accessToken;
        user.athlete = data.athlete;
      }
    };
  });  
})();