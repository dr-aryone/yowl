const express = require('express')
const router = express.Router()

module.exports = function (io) {
  require('./controllers/alertController')(router, io)
  require('./controllers/connectionController')(router)
  require('./controllers/ruleController')(router)
  require('./controllers/userController')(router)

  return router
}
