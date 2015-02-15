(function () {
  'use strict';
     
  var strava = require('strava-v3'),
      https = require('https'),
      express = require('express'),
      router = express.Router(),
      user = require('../../lib/mongo/user');
  
  router.get('/connect', function (req, res) {
    res.end(strava.oauth.getRequestAccessURL({}));
  });
  
  router.get('/exchange', function (req, res) {
    console.log(req.query.code);
    strava.oauth.getToken(req.query.code, function (err, payload) {
      
      user.User.findOne({accessToken: payload.access_token}, 
                        function (err, foundUser) {
        if (err) {
          console.log(err); 
        }
        
        if (foundUser === null) {
          user.User.create(
            { 
              accessToken: payload.access_token,
              name: payload.athlete.name,
              profile: payload.athlete.profile
            },
            function (err, activity) {
              console.log(activity);
            }
          );
        } else {
          console.log('Using already created user!'); 
        }
      });
      
      
      res.json(payload);
      res.end();
    });
  });
  
  module.exports = router;
}());