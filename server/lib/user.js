(function () {
  'use strict';
  
  var db = require('../model/index');
  
  module.exports = exports = new User();
  
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
  
  User.prototype.findUserByAccessToken = function (accessToken, success, fail) {
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
  
  User.prototype.findUserById = function (id, success, fail) {
    db.User.findOne(
      {
        _id: id
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
  
  User.prototype.registerUser = function (stravaUserJson, success, fail) {
    var myUser;
    
    this.findUserByAccessToken(stravaUserJson.access_token, function (user) {
      if (user === null) {
        this.createUser(stravaUserJson, function (user) {
          myUser = user; 
        }); 
      } else {
        myUser = user; 
      }
    }.bind(this));
    
    success(myUser);
  };
  
  User.prototype.updateUser = function (accessToken, hrZones, success, fail) {
    db.User.findOneAndUpdate(
      {
        accessToken: accessToken 
      },
      {
        hrZones: hrZones
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