'use strict'
const db = 'azure'
const Smtp = require('../services/smtpService')
const Connections = require(`../repositories/${db}/connections`)

module.exports = function (router) {
  router.get('/connection', function (req, res) {
    Connections
      .getAll()
      .then((conns) => res.json(conns))
      .catch((err) => res.send(err))
  })

  router.get('/connection/:id', function (req, res) {
    Connections
      .get(req.params.id)
      .then((settings) => res.json(settings || {}))
      .catch((err) => res.send(err))
  })

  router.post('/connection/:id', function (req, res) {
    var config = req.body
    config._id = req.params.id

    Connections
      .update(config)
      .then(() => res.json({'success': true}))
      .catch((err) => res.send(err))
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
