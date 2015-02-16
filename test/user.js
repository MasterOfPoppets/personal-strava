var chai = require('chai'),
    model = require('../server/model/index'),
    User = require('../server/lib/user'),
    should = chai.should();

describe('User', function () {

  before(function (done) {
    model.connect('mongodb://localhost/strava_test');
    done();
  });
  
  describe('findUser', function () {
    var testUser;

    beforeEach(function (done) {
      model.User.create(
        {
          accessToken: 'test_access_token',
          name: 'Testy McTest'
        },
        function (err, user) {
          testUser = user;
          done();
        }
      );
    });
    
    it('retrieves User by accessToken', function (done) {
      User.findUser(testUser.accessToken, function (user) {
        user.name.should.equal(testUser.name);
        done();
      });
    });
    
    it('retrieves no User by unmatched accessToken', function (done) {
      User.findUser('unmatched_access_token', function (user) {
        should.not.exist(user);
        done();
      });
    });
  });
  
  describe('createUser', function () {
    var stravaUserJson = {
      'access_token': 'test_access_token',
      'athlete': {
        'name': 'Testy McTest',
        'profile': 'https://test_image_url'
      }
    };
    
    it('creates User from strava api payload', function (done) {
      User.createUser(stravaUserJson, function (user) {
        user.accessToken.should.equal(stravaUserJson.access_token);
        user.name.should.equal(stravaUserJson.athlete.name);
        user.profile.should.equal(stravaUserJson.athlete.profile);
        done();
      });
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