(function () {
  'use strict';
  
  var db = require('../model/index');
  
  module.exports = exports = new User();
  
  function User() {}
  
  User.prototype.createUser = function (stravaUserJson, callback) {
    db.User.create(
      {
        accessToken: stravaUserJson.access_token,
        name: stravaUserJson.athlete.name,
        profile: stravaUserJson.athlete.profile
      },
      callback
    );
  };
  
  User.prototype.findUserByAccessToken = function (accessToken, callback) {
    db.User.findOne(
      {
        accessToken: accessToken
      }, 
      callback
    );
  };
  
  User.prototype.findUserById = function (id, callback) {
    db.User.findOne(
      {
        _id: id
      }, 
      callback
    );
  };
  
  // Hunt for the user based on input json. If one is found in the database
  // just return that, otherwise its time to go and create a new entry for 
  // the user in the database, returning it afterwards.
  User.prototype.registerUser = function (stravaUserJson, callback) {
    this.findUserByAccessToken(
      stravaUserJson.access_token, 
      function (err, result) {
        if (err) callback(err, null);
        else {
          if (result === null) {
            this.createUser(stravaUserJson, callback);
          } else {
            callback(null, result); 
          }
        }
      }.bind(this)
    );
  };
  
  User.prototype.updateUser = function (accessToken, hrZones, callback) {
    db.User.findOneAndUpdate(
      {
        accessToken: accessToken 
      },
      {
        hrZones: hrZones
      },
      callback
    );
  };
}());