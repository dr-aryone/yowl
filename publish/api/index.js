const express = require('express')
const router = express.Router()

require('./controllers/alertController')(router)
require('./controllers/ruleController')(router)

module.exports = router
