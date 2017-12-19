'use strict'
const Smtp = require('../services/smtpService')
const Connections = require('../models/connectionModel')

module.exports = function (router) {
  router.get('/connection', function (req, res) {
    Connections.find({}, function (err, connections) {
      if (err) {
        res.send(err)
        return
      }

      var keys = connections.map((conn) => conn._id)

      res.json(keys)
    })
  })

  router.get('/connection/smtp', function (req, res) {
    Connections.findOne({_id: 'smtp'}, function (err, settings) {
      if (err) {
        res.send(err)
        return
      }

      res.json(settings || {})
    })
  })

  router.post('/connection/smtp', function (req, res) {
    var settings = {
      host: req.body.host,
      port: req.body.port,
      useSecure: req.body.useSecure,
      useAuthentication: req.body.useAuthentication,
      username: req.body.username,
      password: req.body.password,
      _id: 'smtp'
    }

    Connections.update({_id: settings._id}, settings, {upsert: true}, function (err, numReplaced) {
      if (err) {
        res.send(err)
        return
      }

      res.json({'success': numReplaced === 1})
    })
  })

  router.post('/connection/smtp/test', function (req, res) {
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
