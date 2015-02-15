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
      
      User.findUser(payload);      
      
      res.json(payload);
      res.end();
    });
  });
  
  module.exports = router;
}());