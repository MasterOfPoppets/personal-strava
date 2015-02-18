(function () {
  'use strict';
  
  var db = require('../model/index');
  
  module.exports = exports = new User();
  
  function User() {}
  
  function summarise(user) {
    return {
      _id: user._id,
      name: user.name,
      profile: user.profile,
      hrZones: user.hrZones
    };
  }
  
  User.prototype.createUser = function (stravaUserJson, callback) {
    db.User.create(
      {
        accessToken: stravaUserJson.access_token,
        name: stravaUserJson.athlete.firstname + ' ' +
          stravaUserJson.athlete.lastname,
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
  
  // Hunt for the user based on input json. If one is found in the database
  // just return that, otherwise its time to go and create a new entry for 
  // the user in the database, returning it afterwards.
  User.prototype.registerUser = function (stravaUserJson, callback) {
    var summaryCallback = function (err, result) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, summarise(result));
      }
    }.bind(this);
    
    this.findUserByAccessToken(
      stravaUserJson.access_token, 
      function (err, result) {
        if (err) callback(err, null);
        else {
          if (result === null) {
            this.createUser(stravaUserJson, summaryCallback);
          } else {
            summaryCallback(null, result); 
          }
        }
      }.bind(this)
    );
  };
  
  User.prototype.updateUser = function (id, hrZones, callback) {
    console.log('updating user');
    db.User.findOneAndUpdate(
      {
        _id: id 
      },
      {
        hrZones: hrZones
      },
      callback
    );
  };
}());