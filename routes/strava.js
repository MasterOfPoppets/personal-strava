(function () {
  'use strict';
     
  var strava = require('strava-v3');
  
  function heartrateZonify(payload) {
    var restZone = 0, zone1 = 0, zone2 = 0, zone3 = 0, zone4 = 0, zone5 = 0,
        i = 0, j = 0,
        data;
    
    for (; j < payload.length; j++) {
      if (payload[j].type === 'heartrate') {
        data = payload[j].data;
      }
    }
    
    for (; i < data.length; i++) {
      var datapoint = data[i];
      if (datapoint >= 177) {
        zone5++;
      } else if (datapoint >= 163) {
        zone4++; 
      } else if (datapoint >= 144) {
        zone3++; 
      } else if (datapoint >= 125) {
        zone2++;
      } else if (datapoint >= 96) {
        zone1++;
      } else {
        restZone++; 
      }
    }
    
    return {
      rest: ((restZone / data.length) * 100).toFixed(2),
      z1: ((zone1 / data.length) * 100).toFixed(2),
      z2: ((zone2 / data.length) * 100).toFixed(2),
      z3: ((zone3 / data.length) * 100).toFixed(2),
      z4: ((zone4 / data.length) * 100).toFixed(2),
      z5: ((zone5 / data.length) * 100).toFixed(2)
    };
  }
  
  exports.activityHR = function (req, res) {
    strava.streams.activity(
      {
        'id': req.params.activityId,
        'types': 'heartrate'
      }, 
      function (err, payload) {
        if (!err) {
          res.json(heartrateZonify(payload));
        }
        else {
          console.log(err);
        }
      }
    );
  };
  
  exports.activities = function (req, res) {
    strava.athlete.listActivities(
      {},
      function (err, payload) {
        if (!err) {
          res.json(payload);
        } else {
          console.log(err);
        }
      }
    );
  };
}());