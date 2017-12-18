const express = require('express')
const router = express.Router()

module.exports = function (io) {
  require('./controllers/alertController')(router, io)
  require('./controllers/ruleController')(router)

  return router
}
