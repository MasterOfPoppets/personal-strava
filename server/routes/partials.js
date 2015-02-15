(function () {
  'use strict';
  
  var express = require('express'),
      router = express.Router();

  router.get('/:section', function (req, res) {
    console.log('dealing with ' + req.params.section);
    res.render('partials/' + req.params.section);
  });
  
  module.exports = router;
}());