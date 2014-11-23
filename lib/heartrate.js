(function () {
  'use strict';
  
  module.exports = HeartRate;
  
  function HeartRate(zones) {
    this.zones = zones;
  };
  
  function percentage(num, total) {
    return ((num / total) * 100).toFixed(2);
  }
  
  HeartRate.prototype.calculateHRZonePercentages = function (hrZones) {
    var total = hrZones.total;
    return {
      rest: percentage(hrZones.rest, total),
      z1: percentage(hrZones.z1, total),
      z2: percentage(hrZones.z2, total),
      z3: percentage(hrZones.z3, total),
      z4: percentage(hrZones.z4, total),
      z5: percentage(hrZones.z5, total)
    }
  }
  
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
      total: hrStream.length,
      rest: restCount,
      z1: z1Count,
      z2: z2Count,
      z3: z3Count,
      z4: z4Count,
      z5: z5count
    };
  }
}());