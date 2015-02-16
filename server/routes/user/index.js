(function () {
  'use strict';
     
  var express = require('express'),
      router = express.Router(),
      User = require('../../lib/user');
  
  router.use(function (req, res, next) {
    console.log('testing route middleware');
    next('this is a test');
  });
  
  router.post('/updateUser', function (req, res, message) {
    console.log(message);
    res.end();
  });
  
  module.exports = router;
}());