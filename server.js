(function () {
  'use strict';

  var express = require('express'),
      app = express(),
      index = require('./server/routes/index'),
      partials = require('./server/routes/partials/index'),
      oauth = require('./server/routes/oauth/index'),
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
  app.set('views', __dirname + '/public/views');
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
  app.use('/', index);
  
  // Partials
  app.use('/partials', partials);
  
  // Strava API
  app.use('/oauth', oauth);
  
  // Misc.
  app.use(express.static(__dirname + '/public'));
  app.use('*', index);
    
  // Establish MongoDB connection
  mongoose.connect('mongodb://localhost/strava');
  var conn = mongoose.connection;
  conn.on('error', console.error.bind(console, 'connection error:'));
  conn.once('open', function callback () {
    app.listen(port);
  });
}());