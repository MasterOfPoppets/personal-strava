(function () {
  'use strict';

  exports.loadPartial = function (req, res) {
    res.render('partials/' + req.params.section);
  };
  
  exports.loadHR = function (req, res) {
    res.render('partials/activity_hr');
  };
  
  exports.index = function (req, res) {
    res.render('index');
  };
}());