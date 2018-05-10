'use strict'
const Smtp = require('../services/smtpService')
const Connections = require('../repositories/nedb/connections')

module.exports = function (router) {
  router.get('/connection', function (req, res) {    
    Connections.find({}, function (err, connections) {
      if (err) {
        res.send(err)
        return
      }

      res.json(connections)
    })
  })

  router.get('/connection/:id', function (req, res) {
    Connections.findOne({_id: req.params.id}, function (err, settings) {
      if (err) {
        res.send(err)
        return
      }

      res.json(settings || {})
    })
  })  

  router.post('/connection/:id', function (req, res) {
    var config = req.body
    config._id = req.params.id

    Connections.update({_id: config._id}, config, {upsert: true}, function (err, numReplaced) {
      if (err) {
        res.send(err)
        return
      }

      res.json({'success': numReplaced === 1})
    })
  })  

  router.post('/connection/:id/test', function (req, res) {
    var mailer = Smtp(
      req.body.host,
      req.body.port,
      req.body.useSecure === 'y',
      req.body.useAuthentication === 'y',
      req.body.username,
      req.body.password
    )

    mailer.send(
      'hello@yowl.email',
      req.body.testTo,
      'Test Notification from Yowl',
      'This is a test message sent from the Yowl service.',
      (response) => {
        if (!response.success) {
          res.status(500).send(response.error)
          return
        }

        res.json({'success': true})
      })
  })
}
