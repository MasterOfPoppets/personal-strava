(function () {
  'use strict';
  
  var db = require('../model/user');
  
  module.exports = new User();
  
  function User() {}
  
  User.prototype.createUser = function (stravaUserPayload) {
    db.User.create(
      {
        accessToken: stravaUserPayload.access_token,
        name: stravaUserPayload.athlete.name,
        profile: stravaUserPayload.athlete.profile
      },
      function (err, user) {
        console.log(user); 
      }
    );
  };
  
  User.prototype.findUser = function (stravaUserPayload) {
    db.User.findOne(
      {
        accessToken: stravaUserPayload.access_token
      }, 
      function (err, user) {
        if (err) console.log(err);
        else if (user === null) this.createUser(stravaUserPayload);
        else console.log('Using already created user!');
      }
    );
  };
}());