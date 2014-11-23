(function () {
  'use strict';
     
  var strava = require('strava-v3'),
      db = require('../db');
  
  function getHRStreamFromPayload(payload, next, callback) {
    var data;
    
    for (var i = 0; i < payload.length; i++) {
      if (payload[i].type === 'heartrate') {
        return next(payload[i].data, callback);
      }
    }
    
    return callback('No heartrate data available', {});
  }
  
  function heartrateZonify(data, callback) {
    db.User.findOne({name: 'Gareth'}, function (err, user) {
      if (err || user === null) {
        return callback(err || 'Unable to find user', {});
      }
      
      var restZone = 0, zone1 = 0, zone2 = 0, zone3 = 0, zone4 = 0, zone5 = 0;
      
      for (var i = 0; i < data.length; i++) {
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

      return callback('', {
        userId: user._id,
        hrZonePercentages: {
          rest: ((restZone / data.length) * 100).toFixed(2),
          z1: ((zone1 / data.length) * 100).toFixed(2),
          z2: ((zone2 / data.length) * 100).toFixed(2),
          z3: ((zone3 / data.length) * 100).toFixed(2),
          z4: ((zone4 / data.length) * 100).toFixed(2),
          z5: ((zone5 / data.length) * 100).toFixed(2)
        }
      });
    });
  }
  
  function getActivityHRZonePercentages(activityId, callback) {
    strava.streams.activity(
      {
        'id': activityId,
        'types': 'heartrate'
      },
      function (err, payload) {
        if (err) return callback(err, {});
        
        getHRStreamFromPayload(payload, heartrateZonify, function (err, data) {
          if (err) return callback(err, {});
          
          db.Activity.create(
            { 
              userId: data.userId,
              activityId : activityId,
              hrZonePercentages: data.hrZonePercentages
            },
            function (err, activity) {
              console.log(activity);
            }
          );
          
          return callback('', data.hrZonePercentages);
        });
      }
    );
  }
  
  exports.activityHR = function (req, res) {
    db.Activity.findOne(
      {
        activityId: req.params.activityId
      }, 
      function (err, activity) {
        if (activity) {
          res.json(activity.hrZonePercentages);
        } else {
          getActivityHRZonePercentages(
            req.params.activityId, 
            function (err, hrZonePercentages) {
              if (err) {
                console.error(err);
              } else {
                res.json(hrZonePercentages); 
              }
            }
          ); 
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