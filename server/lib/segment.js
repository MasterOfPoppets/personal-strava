(function () {
  'use strict';
  
  var db = require('../model/index');
  
  module.exports = exports = new Segment();
  
  function Segment() {}
  
  Segment.prototype.createSegments = function (activity, callback) {
    // As a test, extract the segments from the activity and add to db
    
    console.log('Checking ' + activity.segment_efforts.length + ' segments');
    
    var segments = [];
    
    for (var i = 0; i < activity.segment_efforts.length; i++) {
      var segment = activity.segment_efforts[i].segment;
      
      segments.push(
        {
          segment_id: segment.id,
          name: segment.name,
          category: segment.climb_category
        }
      );
    }
    
    console.log(segments);
    
    db.Segment.create(segments, callback);
  };
}());