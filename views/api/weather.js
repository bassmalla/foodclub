'use strict';

exports.read = function(req, res, next) {
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    workflow.emit('read');
  });   

  workflow.on('read', function() {
    req.app.db.models.Weather.find({}, function(err, data) {
      if (err) {
        return workflow.emit('exception', err);
      }

      workflow.outcome.data = data;
      workflow.emit('response');
    });
  });

  return workflow.emit('validate');
};

exports.readByQuery = function(req, res, next) {
  var q = req.params.q;
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    workflow.emit('read');
  });   

  workflow.on('read', function() {
    req.app.db.models.Weather.find({}, function(err, data) {
      if (err) {
        return workflow.emit('exception', err);
      }

      var length = data.length;
      var data = data[length -1];

      workflow.outcome.coord = data.coord;
      workflow.outcome.main = data.main;

      workflow.emit('response');
    });
  });

  return workflow.emit('validate');
};