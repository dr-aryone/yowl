const db = 'azure';
const Alerts = require(`../repositories/${db}/alerts`)

module.exports = function AlertController (router, io) {
  function increaseAlertCount (alert, res) {
    alert.count = alert.count || 0
    alert.count++

    // Alerts.update({_id: alert._id}, alert, {}, function (err, numReplaced) {
    //   if (err) {
    //     res.send(err)
    //     return
    //   }

    //   io.sockets.emit('alert:updated', alert)
    //   res.json(alert)
    // })
  }

  function insertAlert (newAlert, res) {
    Alerts
      .create(newAlert)
      .then(function (alert) {
        io.sockets.emit('alert:created', alert)
        res.json(alert)
      })
      .catch(function (err) {
        res.send(err)
      });
  }

  router.get('/alerts', function (req, res) {
    Alerts
      .getAll()
      .then(function (alerts) {
        res.send(alerts);
      })
      .catch(function (err) {
        res.send(err);
      });
  })

  router.post('/alerts', function (req, res) {
    var newAlert = req.body;

    Alerts
      .find(newAlert.application, newAlert.errorCode)
      .then(function (alert) {
        if (alert != null) {
          increaseAlertCount(alert, res)
        }
        else {
          insertAlert(newAlert, res)
        }
      })
      .catch(function (err) {
        res.send(err);
      });
  });

  router.delete('/alerts/:alertId', function (req, res) {
    Alerts
      .delete({_id: req.params.alertId})
      .then(function() {
        res.json({'success': true})
      })
      .catch(function(err) {
        res.send(err)
      })
  })
}
