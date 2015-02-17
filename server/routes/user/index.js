(function () {
  'use strict';
     
  var express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser'),
      User = require('../../lib/user');
  
  router.post('/:userId/updateUser', bodyParser.json(), function (req, res) {
    User.updateUser(
      req.params.userId, req.body.hrzones, 
      function (err, result) {
        if (err) console.log(err);
        else {
          console.log(result);
        }
        res.end();
      }
    );
  });
  
  module.exports = router;
}());