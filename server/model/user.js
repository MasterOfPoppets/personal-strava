var mongoose = require('mongoose');
  
var userSchema = mongoose.Schema({
  accessToken: String,
  name: String,
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

exports.User = mongoose.model('User', userSchema);