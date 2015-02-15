(function () {
  'use strict';
  
  var mongoose = require('mongoose');
  
  var activitySchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    activityId: String,
    hrZonePercentages: {
      rest: Number,
      z1: Number,
      z2: Number,
      z3: Number,
      z4: Number,
      z5: Number
    }
  });
  
  var userSchema = mongoose.Schema({
    name: String,
    hrZones: {
      z1: Number,
      z2: Number,
      z3: Number,
      z4: Number,
      z5: Number
    }
  });
  
  exports.Activity = mongoose.model('Activity', activitySchema);
  
  exports.User = mongoose.model('User', userSchema);
}());