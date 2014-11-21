(function () {
  'use strict';
     
  var strava = require('strava-v3'),
      db = require('../db');
  
  function heartrateZonify(payload, callback) {
    var restZone = 0, zone1 = 0, zone2 = 0, zone3 = 0, zone4 = 0, zone5 = 0,
        i = 0, j = 0,
        data;
    
    for (; j < payload.length; j++) {
      if (payload[j].type === 'heartrate') {
        data = payload[j].data;
      }
    }
    
    if (!data) {
      callback('No heartrate data available', {});
      return;
    }
    
    db.User.findOne({name: 'Gareth'}, function (err, user) {
      if (err) {
        callback(err, {});
        return;
      }
      
      for (; i < data.length; i++) {
        var datapoint = data[i];
        if (datapoint >= user.hrZones.z5) {
          zone5++;
        } else if (datapoint >= user.hrZones.z4) {
          zone4++; 
        } else if (datapoint >= user.hrZones.z3) {
          zone3++; 
        } else if (datapoint >= user.hrZones.z2) {
          zone2++;
        } else if (datapoint >= user.hrZones.z1) {
          zone1++;
        } else {
          restZone++; 
        }
      }

      callback('', {
        rest: ((restZone / data.length) * 100).toFixed(2),
        z1: ((zone1 / data.length) * 100).toFixed(2),
        z2: ((zone2 / data.length) * 100).toFixed(2),
        z3: ((zone3 / data.length) * 100).toFixed(2),
        z4: ((zone4 / data.length) * 100).toFixed(2),
        z5: ((zone5 / data.length) * 100).toFixed(2)
      });
    });
  }
  
  exports.activityHR = function (req, res) {
    strava.streams.activity(
      {
        'id': req.params.activityId,
        'types': 'heartrate'
      }, 
      function (err, payload) {
        if (!err) {
          heartrateZonify(payload, function (err, data) {
            if (err) {
              console.error(err);
            } else {
              res.json(data);
            }
          });
        }
        else {
          console.error(err);
        }
      }
    );
  };
  
  exports.activities = function (req, res) {
    strava.athlete.listActivities(
      {
        'page': req.params.page
      },
      function (err, payload) {
        if (!err) {
          res.json(payload);
        } else {
          console.error(err);
        }
      }
    );
  };
}());