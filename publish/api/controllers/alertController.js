const Alerts = require('../models/alertModel')

module.exports = function AlertController (router, io) {
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

    Alerts.insert(newAlert, function (err, alert) {
      if (err) {
        res.send(err)
        return
      }

      io.sockets.emit('alert:created', alert)
      res.json(alert)
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
