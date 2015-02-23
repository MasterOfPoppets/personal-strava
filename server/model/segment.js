var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var segmentSchema = Schema({
  segment_id: { type: String, unique: true },
  name: String,
  climb_category: String,
  efforts: [Schema.Types.ObjectId]
});

exports.Segment = mongoose.model('Segment', segmentSchema);
