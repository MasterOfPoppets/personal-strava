(function () {
  'use strict';
     
  var strava = require('strava-v3'),
      https = require('https');
  
  exports.login = function (req, res) {
    res.end(strava.oauth.getRequestAccessURL({}));
  };
  
  exports.exchange = function (req, res) {
    console.log(req.query.code);
    strava.oauth.getToken(req.query.code, function (err, payload) {
      console.log(payload);
      res.end();
    });
  };
}());