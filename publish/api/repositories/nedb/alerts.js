'use strict'

var Datastore = require('nedb')
var path = require('path')

var alertsDb = new Datastore({
  filename: path.join(__dirname, '/../db/alerts.db'),
  autoload: true
})

exports.get = function () {
  return new Promise((resolve, reject) => {
    Alerts.find({}, function (err, alerts) {
      if (err) {
        reject(err);
        return
      }

      resolve(alerts);
    })
  });    
}

// findOne
// Alerts.findOne({
//   application: newAlert.application,
//   errorCode: newAlert.errorCode
// },
// function (err, alert) {
//   if (err) {
//     res.send(err)
//     return
//   }

//   if (alert != null) {
//     increaseAlertCount(alert, res)
//   }
//   else {
//     insertAlert(newAlert, res)
//   }
// })

//insert
// Alerts.insert(newAlert, function (err, alert) {
//   if (err) {
//     res.send(err)
//     return
//   }

//   io.sockets.emit('alert:created', alert)
//   res.json(alert)
// })

//delete
// Alerts.remove({_id: req.params.alertId}, {}, function (err, numRemoved) {
//   if (err) {
//     res.send(err)
//     return
//   }

//   res.json({'success': numRemoved === 1})
// })

//update
// Alerts.update({_id: alert._id}, alert, {}, function (err, numReplaced) {
//   if (err) {
//     res.send(err)
//     return
//   }

//   io.sockets.emit('alert:updated', alert)
//   res.json(alert)
// })