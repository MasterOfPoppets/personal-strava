(function () {
  'use strict';

  var express = require('express'),
      app = express(),
      index = require('./server/routes/index'),
      model = require('./server/model/index'),
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
  app.use('/partials', index.partials);
  
  // Strava API
  app.use('/oauth', index.oauth);
  app.use('/user', index.user);
  app.use('/activities', index.activities);
  app.use('/segments', index.segments);
  
  // Misc.
  app.use(express.static(__dirname + '/public'));
  app.use('*', index);
    
  // Start the server!
  model.connect('mongodb://localhost/strava');
  app.listen(port);
}());