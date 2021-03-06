(function () {
  'use strict';

  var mongoose = require('mongoose'),
      User = require('./user').User,
      Segment = require('./segment').Segment;
  
  exports.connect = function (db) {
    // Establish MongoDB connection
    mongoose.connect(db);
  };
  
  exports.cleanup = function () {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
  };
  
  exports.User = User;
  exports.Segment = Segment;
}());