(function () {
  'use strict';
     
  var strava = require('strava-v3'),
      express = require('express'),
      router = express.Router(),
      Segment = require('../../lib/segment');
  
  router.get('/', function (req, res) {
    Segment.getSegments(function (err, result) {
      res.json(result);
    });
  });
  
  module.exports = router;
}());