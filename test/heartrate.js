var should = require("chai").should(),
    HeartRate = require('../lib/heartrate');
    
describe('#parseHRStreamToZones', function() {
  it('should aggregate HR data into appropriate zones', function () {
    var hr = new HeartRate({
      z1: 100,
      z2: 120,
      z3: 140,
      z4: 160,
      z5: 180
    });
    
    hr.parseHRStreamToZones([90, 110, 130, 150, 170, 190]).should.deep.equal({
      rest: 1,
      z1: 1,
      z2: 1,
      z3: 1,
      z4: 1,
      z5: 1
    });
  });
});