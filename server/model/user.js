var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  accessToken: String,
  firstname: String,
  lastname: String,
  profile: String,
  hr_zones: {
    z1: Number,
    z2: Number,
    z3: Number,
    z4: Number,
    z5: Number
  },
  hr_zones_set: { type: Boolean, default: false },
  all_ride_totals: {
    count: Number,
    distance: Number,
    moving_time: Number,
    elapsed_time: Number,
    elevation_gain: Number
  },
  ytd_ride_totals: {
    count: Number,
    distance: Number,
    moving_time: Number,
    elapsed_time: Number,
    elevation_gain: Number
  }
});

userSchema.virtual('name').get(function () {
  return this.firstname + ' ' + this.lastname;
});

exports.User = mongoose.model('User', userSchema);
