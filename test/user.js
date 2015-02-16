var chai = require('chai'),
    sinon = require('sinon'),
    model = require('../server/model/index'),
    User = require('../server/lib/user'),
    should = chai.should();

describe('User', function () {
  var testUserJson = {
        access_token: 'test_access_token',
        athlete: {
          name: 'Testy McTest',
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
        name: 'Testy McTest'
      },
      function (err, user) {
        testUser = user;
        done();
      }
    );
  });
  
  describe('createUser', function () {
   it('creates User from strava api payload', function (done) {
      User.createUser(testUserJson, function (user) {
        user.accessToken.should.equal(testUserJson.access_token);
        user.name.should.equal(testUserJson.athlete.name);
        user.profile.should.equal(testUserJson.athlete.profile);
        done();
      });
    });
  });
  
  describe('findUserByAccessToken', function () {
    it('retrieves User by accessToken', function (done) {
      User.findUserByAccessToken(testUser.accessToken, function (user) {
        user.name.should.equal(testUser.name);
        done();
      });
    });
    
    it('retrieves no User by unmatched accessToken', function (done) {
      User.findUserByAccessToken('unmatched_access_token', function (user) {
        should.not.exist(user);
        done();
      });
    });
  });
  
  describe('findUserById', function () {
    it('retrieves User by id', function (done) {
      User.findUserById(testUser._id, function (user) {
        user.name.should.equal(testUser.name);
        done();
      });
    });
  });
  
  describe('registerUser', function () {
    var newUserJson = {
          access_token: 'new_access_token',
          athlete: {
            name: 'Zaphod Beeblebrox',
            profile: 'https://test_image_url'
          }
        };
    
    before(function () {
      spy = sinon.spy(User, 'createUser');
    });
    
    it('find User in database and return summary', function (done) {
      User.registerUser(testUserJson, function (user) {
        spy.called.should.be.false;
        done();
      });
    });
    
    it('creates new User in database and return summary', function (done) {
      User.registerUser(newUserJson, function (user) {
        spy.called.should.be.true;
        done();
      });
    });
    
    after(function () {
      spy.restore();
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
      User.updateUser(testUser.accessToken, hrZones, function (user) {
        user.hrZones.should.have.deep.property('z1', 100);
        user.hrZones.should.have.deep.property('z2', 120);
        user.hrZones.should.have.deep.property('z3', 140);
        user.hrZones.should.have.deep.property('z4', 160);
        user.hrZones.should.have.deep.property('z5', 180);
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