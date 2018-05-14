const db = 'azure';
const Alerts = require(`../repositories/${db}/alerts`)

module.exports = function AlertController (router, io) {
  function increaseAlertCount (alert, res) {
    alert.count = alert.count || 0
    alert.count++

    Alerts
      .update(alert)
      .then(function() {
        io.sockets.emit('alert:updated', alert)
        res.json(alert)
      })
      .catch(function(err) { res.send(err); })
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

  function convertSplunkToYowl(req){
    //SPLUNK WEBHOOK PAYLOAD - http://docs.splunk.com/Documentation/Splunk/6.6.4/Alert/Webhooks
      return {
          application: req.app,
          errorCode: req.search_name,
          message: req.results_link,
          severity: 'error'
      }
  }

  function incomingAlert(newAlert, res){
    
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
  }

  router.get('/alerts', function (req, res) {
    Alerts
      .getAll()
      .then(function (alerts) {
        res.json(alerts);
      })
      .catch(function (err) {
        res.send(err);
      });
  })

  router.post('/alerts', function (req, res) {
    var newAlert = req.body;

    incomingAlert(newAlert, res);
  });

  router.post('/alerts/splunk', function (req, res) {
    var newAlert = convertSplunkToYowl(req.body);

    incomingAlert(newAlert, res);
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
