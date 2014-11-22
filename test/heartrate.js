var should = require("chai").should(),
    hr = require('../lib/heartrate');
    
describe('#parseHRStreamToZones', function() {
  it('should aggregate HR data into appropriate zones', function () {
    var myHr = new hr();
    
    myHr.parseHRStreamToZones().should.deep.equal({
      rest: 1,
      z1: 1,
      z2: 1,
      z3: 1,
      z4: 1,
      z5: 1
    });
  });
});