(function () {
  'use strict';
  
  var express = require('express'),
      router = express.Router(),
      partials = require('./partials/index'),
      oauth = require('./oauth/index'),
      user = require('./user/index'),
      activities = require('./activities/index'),
      segments = require('./segments/index');
  
  router.get('/', function (req, res) {
    res.render('index');
  });
  
  // Top level router
  module.exports = router;
  
  // Api routes
  module.exports.partials = partials;
  module.exports.oauth = oauth;
  module.exports.user = user;
  module.exports.activities = activities;
  module.exports.segments = segments;
})();