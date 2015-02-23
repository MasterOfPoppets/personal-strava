var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
  activity_id: { type: String, unique: true },
  user_id: String,
  name: String
});

exports.Activity = mongoose.model('Activity', activitySchema);
