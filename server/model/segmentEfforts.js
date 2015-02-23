var mongoose = require('mongoose');

var segmentEffortSchema = mongoose.Schema({
  segment_effort_id: { type: String, unique: true },
  user_id: String,
  elapsed_time: Number
});

exports.SegmentEffort = mongoose.model('SegmentEffort', segmentEffortSchema);
