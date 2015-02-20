var mongoose = require('mongoose');
  
var userSchema = mongoose.Schema({
  accessToken: String,
  firstname: String,
  lastname: String,
  profile: String,
  hrZones: {
    z1: Number,
    z2: Number,
    z3: Number,
    z4: Number,
    z5: Number
  },
  hrZonesSet: { type: Boolean, default: false }
});

userSchema.virtual('name').get(function () {
  return this.firstname + ' ' + this.lastname;
});

exports.User = mongoose.model('User', userSchema);