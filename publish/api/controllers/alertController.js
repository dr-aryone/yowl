const db = 'azure'
const Alerts = require(`../repositories/${db}/alerts`)

module.exports = function AlertController (router, io) {
  function increaseAlertCount (alert, res) {
    alert.count = alert.count || 0
    alert.count++

    Alerts
      .update(alert)
      .then(function () {
        io.sockets.emit('alert:updated', alert)
        res.json(alert)
      })
      .catch((err) => res.send(err))
  }

  function insertAlert (newAlert, res) {
    Alerts
      .create(newAlert)
      .then(function (alert) {
        io.sockets.emit('alert:created', alert)
        res.json(alert)
      })
      .catch((err) => res.send(err))
  }

  router.get('/alerts', function (req, res) {
    Alerts
      .getAll()
      .then((alerts) => res.json(alerts))
      .catch((err) => res.send(err))
  })

  router.post('/alerts', function (req, res) {
    var newAlert = req.body

    Alerts
      .find(newAlert.application, newAlert.errorCode)
      .then(function (alert) {
        if (alert != null) {
          increaseAlertCount(alert, res)
        } else {
          insertAlert(newAlert, res)
        }
      })
      .catch(function (err) {
        res.send(err)
      })
  })

  router.delete('/alerts/:alertId', function (req, res) {
    Alerts
      .delete({_id: req.params.alertId})
      .then(() => res.json({'success': true}))
      .catch((err) => res.send(err))
  })
}
