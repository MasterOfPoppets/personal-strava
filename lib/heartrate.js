(function () {
  'use strict';
  
  module.exports = HeartRate;
  
  function HeartRate(zones) {
    this.zones = zones;
  };
  
  HeartRate.prototype.parseHRStreamToZones = function (hrStream) {
    var restCount = 0,
        z1Count = 0,
        z2Count = 0,
        z3Count = 0,
        z4Count = 0,
        z5count = 0;
        
    for (var i = 0; i < hrStream.length; i++) {
      if (hrStream[i] >= this.zones.z5) z5count++;
      else if (hrStream[i] >= this.zones.z4) z4Count++;
      else if (hrStream[i] >= this.zones.z3) z3Count++;
      else if (hrStream[i] >= this.zones.z2) z2Count++;
      else if (hrStream[i] >= this.zones.z1) z1Count++;
      else restCount++;
    }
    return {
      rest: restCount,
      z1: z1Count,
      z2: z2Count,
      z3: z3Count,
      z4: z4Count,
      z5: z5count
    };
  }
}());