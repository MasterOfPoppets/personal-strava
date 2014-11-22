var should = require('chai').should(),
    strava = require('../routes/strava');

describe('#testMocha()', function () {
  it('should return a greeting', function () {
    strava.testMocha('Gareth').should.equal('Hello Gareth');
  })
})

describe('#testMocha2()', function () {
  it('should return a greeting', function () {
    strava.testMocha2('Gareth', 'Hughes').should.equal('Hello Gareth Hughes');
  })
})