var mongoose = require('mongoose');
  
var segmentSchema = mongoose.Schema({
  segment_id: { type: String, unique: true },
  name: String,
  category: String
});

exports.Segment = mongoose.model('Segment', segmentSchema);