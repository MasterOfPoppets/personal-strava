(function () {
  'use strict';
     
  var strava = require('strava-v3'),
      https = require('https'),
      express = require('express'),
      router = express.Router();
  
  router.get('/connect', function (req, res) {
    res.end(strava.oauth.getRequestAccessURL({}));
  });
  
  router.get('/exchange', function (req, res) {
    console.log(req.query.code);
    strava.oauth.getToken(req.query.code, function (err, payload) {
      res.json(payload);
      res.end();
    });
  });
  
  module.exports = router;
}());