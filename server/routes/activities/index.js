(function () {
  'use strict';
     
  var strava = require('strava-v3'),
      express = require('express'),
      router = express.Router(),
      Segment = require('../../lib/segment');
  
  router.get('/', function (req, res) {
    strava.athlete.listActivities(
      {},
      function (err, payload) {
        if (!err) {
          res.json(payload);
        } else {
          console.error(err);
        }
        res.end();
      }
    );
  });
  
  router.get('/:activityId', function (req, res) {
    strava.activities.get(
      {
        id: req.params.activityId,
        include_all_efforts: true
      },
      function (err, payload) {
        Segment.createSegments(payload);
        res.end();
      }
    );
  });
  
  module.exports = router;
}());