'use strict';

var Alerts = require("../models/alertModel");

module.exports = function(io) {
  return {
    list_all_alerts: function(req, res) {
      Alerts.find({}, function(err, alerts) {
        if (err) {
          res.send(err);
          return;
        }
    
        res.json(alerts);
      });
    },
    create_an_alert: function(req, res) {
      var newAlert = req.body;
    
      Alerts.insert(newAlert, function(err, alert) {
        if (err) {
          res.send(err);
          return;
        }
    
        io.sockets.emit("alert:created", alert);
        res.json(alert);
      });
    },
    read_an_alert: function(req, res) {
      Alerts.findOne({_id: req.params.id}, function(err, alert) {
        if (err) {
          res.send(err);
          return;
        }
    
        if (alert === null) {
          res.json({
            type: 'error',
            message: 'No alert found with the "id" of "' + req.params.id + '".'
          });
    
          return;
        }
    
        res.json(alert);
      });
    }
  }
}