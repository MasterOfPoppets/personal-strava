var should = require("chai").should(),
    HeartRate = require('../lib/heartrate'),
    hrZones = {
      z1: 100,
      z2: 120,
      z3: 140,
      z4: 160,
      z5: 180
    }
    
describe('#parseHRStreamToZones', function () {
  it('should aggregate HR data into appropriate zones', function () {
    var hr = new HeartRate(hrZones);
    
    hr.parseHRStreamToZones([90, 110, 130, 150, 170, 190]).should.deep.equal({
      total: 6,
      rest: 1,
      z1: 1,
      z2: 1,
      z3: 1,
      z4: 1,
      z5: 1
    });
  });
});

describe('#calculateHRZonePercentages', function () {
  it('should correctly calculate percentages for each zone', function () {
    var hr = new HeartRate(hrZones);
    
    hr.calculateHRZonePercentages([6, 0, 1, 1, 1, 2, 0]).should.deep.equal({
      rest: 0,
      z1: 20,
      z2: 20,
      z3: 20,
      z4: 40,
      z5: 0
    });
  });
});