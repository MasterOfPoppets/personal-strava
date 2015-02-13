(function () {
  'use strict';
  
  angular.module('gh.strava.user', [])
  
  .factory('UserFactory', function () {
    var user = {
      avatar: '' 
    };
    
    return {
      avatar: function () {
        return user.avatar; 
      },
      
      setAvatar: function (avatar) {
        user.avatar = avatar; 
      }
    };
  });  
})();