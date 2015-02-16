(function () {
  'use strict';
  
  var db = require('../model/index');
  
  module.exports = new User();
  
  function User() {}
  
  User.prototype.createUser = function (stravaUserJson, success, fail) {
    db.User.create(
      {
        accessToken: stravaUserJson.access_token,
        name: stravaUserJson.athlete.name,
        profile: stravaUserJson.athlete.profile
      },
      function (err, user) {
        if (err) {
          fail(err);
        } else {
          success(user); 
        }
      }
    );
  };
  
  User.prototype.findUser = function (accessToken, success, fail) {
    db.User.findOne(
      {
        accessToken: accessToken
      }, 
      function (err, user) {
        if (err) {
          fail(err);
        } else {
          success(user);
        }
      }
    );
  };
}());