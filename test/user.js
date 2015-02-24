var chai = require('chai'),
    model = require('../server/model/index'),
    User = require('../server/lib/user'),
    should = chai.should();

describe('User', function () {
  var testUserJson = {
        access_token: 'test_access_token',
        athlete: {
          id: '12345',
          firstname: 'Testy',
          lastname: 'McTest',
          profile: 'https://test_image_url'
        }
      };

  before(function (done) {
    model.connect('mongodb://localhost/strava_test');
    done();
  });

  beforeEach(function (done) {
    model.User.create(
      {
        accessToken: 'test_access_token',
        name: 'Testy McTest',
        profile: 'https://test_image_url'
      },
      function (err, user) {
        testUser = user;
        done();
      }
    );
  });

  describe('createUser', function () {
   it('creates User from strava api payload', function (done) {
      User.createUser(testUserJson, function (err, result) {
        result.accessToken.should.equal(testUserJson.access_token);
        result.athleteId.should.equal(testUserJson.athlete.id);
        result.name.should.equal(
          testUserJson.athlete.firstname + ' ' + testUserJson.athlete.lastname
        );
        result.profile.should.equal(testUserJson.athlete.profile);
        done();
      });
    });
  });

  describe('findUserByAccessToken', function () {
    it('retrieves User by accessToken', function (done) {
      User.findUserByAccessToken(testUser.accessToken, function (err, result) {
        result.name.should.equal(testUser.name);
        done();
      });
    });

    it('retrieves no User by unmatched accessToken', function (done) {
      User.findUserByAccessToken('unmatched_access_token', function (err, result) {
        should.not.exist(result);
        done();
      });
    });
  });

  describe('registerUser', function () {
    var newUserJson = {
          access_token: 'new_access_token',
          athlete: {
            firstname: 'Zaphod',
            lastname: 'Beeblebrox',
            profile: 'https://test_image_url'
          }
        };

    it('find User in database and return summary', function (done) {
      // register with testUserJson and test expected output
      User.registerUser(testUserJson, function (err, result) {
        result._id.toString().should.equal(testUser._id.toString());
        done();
      });
    });

    it('creates new User in database and return summary', function (done) {
      // register with newUserJson and test expected output
      User.registerUser(newUserJson, function (err, result) {
        result.name.should.equal(
          newUserJson.athlete.firstname + ' ' + newUserJson.athlete.lastname
        );
        done();
      });
    });
  });

  describe('updateUser', function () {
    var hrZones = {
      z1: 100,
      z2: 120,
      z3: 140,
      z4: 160,
      z5: 180
    };

    it('updates the User with heart rate zones', function (done) {
      testUser.hr_zones_set.should.be.false;
      User.updateUser(testUser._id, hrZones, function (err, result) {
        result.hr_zones.should.have.deep.property('z1', hrZones.z1);
        result.hr_zones.should.have.deep.property('z2', hrZones.z2);
        result.hr_zones.should.have.deep.property('z3', hrZones.z3);
        result.hr_zones.should.have.deep.property('z4', hrZones.z4);
        result.hr_zones.should.have.deep.property('z5', hrZones.z5);
        result.hr_zones_set.should.be.true;
      });
      done();
    });
  });

  afterEach(function (done) {
    model.User.remove({}, function () {
      done();
    });
  });

  after(function (done) {
    model.cleanup();
    done();
  });
});
