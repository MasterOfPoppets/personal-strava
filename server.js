(function () {
  'use strict';

  var express = require('express'),
      app = express(),
      router = require('./routes/router'),
      strava = require('./routes/strava'),
      mongoose = require('mongoose'),
      stylus = require('stylus'),
      nib = require('nib'),
      port = process.env.PORT || 3000;
    
  // Special Stylus compile
  function compile(str, path) {
    return stylus(str)
      .set('compress', true)
      .set('filename', path)
      .use(nib());
  }
    
  // Config
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(stylus.middleware(
    {
      src: __dirname + '/build',
      dest: __dirname + '/public',
      compile: compile
    }
  ));
    
  // Logging middleware
  app.use('/', function (req, res, next) {
    console.log(req.method, req.url);
    next();
  });
  
  // General
  app.get('/', router.index);
  
  function serverGreeting(name) {
    return "Hello " + name;
  }
  
  module.exports.serverGreeting = serverGreeting;
  
  // Partials
  app.get('/partials/:section', router.loadPartial);
  app.get('/partials/activities/hr/:id', router.loadHR);
  
  // Strava API test
  app.get('/act/:page', strava.activities);
  app.get('/act/hr/:activityId', strava.activityHR);
  
  // Misc.
  app.use(express.static(__dirname + '/public'));
  app.use('*', router.index);
    
  // Establish MongoDB connection
  // mongoose.connect('mongodb://localhost/strava');
  // var conn = mongoose.connection;
  // conn.on('error', console.error.bind(console, 'connection error:'));
  // conn.once('open', function callback () {
    // var db = require('./db');
    // app.listen(port);
  // });
  
  app.listen(port, process.env.IP);
}());