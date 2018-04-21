const Alerts = require('../models/alertModel')

module.exports = function AlertController (router, io) {
  function increaseAlertCount (alert, res) {
    alert.count = alert.count || 0
    alert.count++

    Alerts.update({_id: alert._id}, alert, {}, function (err, numReplaced) {
      if (err) {
        res.send(err)
        return
      }

      io.sockets.emit('alert:updated', alert)
      res.json(alert)
    })
  }

  function insertAlert (newAlert, res) {
    Alerts.insert(newAlert, function (err, alert) {
      if (err) {
        res.send(err)
        return
      }

      io.sockets.emit('alert:created', alert)
      res.json(alert)
    })
  }

  router.get('/alerts', function (req, res) {
    Alerts.find({}, function (err, alerts) {
      if (err) {
        res.send(err)
        return
      }

      res.json(alerts)
    })
  })

  router.post('/alerts', function (req, res) {
    var newAlert = req.body

    Alerts.findOne({
      application: newAlert.application,
      errorCode: newAlert.errorCode
    },
    function (err, alert) {
      if (err) {
        res.send(err)
        return
      }

      if (alert != null) {
        increaseAlertCount(alert, res)
      }
      else {
        insertAlert(newAlert, res)
      }
    })
  })

  router.delete('/alerts/:alertId', function (req, res) {
    Alerts.remove({_id: req.params.alertId}, {}, function (err, numRemoved) {
      if (err) {
        res.send(err)
        return
      }

      res.json({'success': numRemoved === 1})
    })
  })
}
