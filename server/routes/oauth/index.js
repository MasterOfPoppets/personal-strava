(function () {
  'use strict';
     
  var strava = require('strava-v3'),
      https = require('https'),
      express = require('express'),
      router = express.Router(),
      User = require('../../lib/user');
  
  router.get('/connect', function (req, res) {
    res.end(strava.oauth.getRequestAccessURL({}));
  });
  
  router.get('/exchange', function (req, res) {
    strava.oauth.getToken(req.query.code, function (err, payload) {
      
      User.registerUser(payload, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
        res.end();
      });
    });
  });
  
  module.exports = router;
}());