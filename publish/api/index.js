const express = require('express')
const router = express.Router()

//const Connections = require('./repositories/nedb/connections')
const { readdirSync, readFileSync } = require('fs')

// function loadNewConnections() {  
//   var inFolder = readdirSync('./api/connections')  
  
//   Connections.find({}, function (err, connections) {
//     if (err) return

//     var dbKeys = connections.map(conn => conn._id)
//     var folderKeys = inFolder.filter(key => dbKeys.indexOf(key) < 0)

//     for(var i in folderKeys) {
//       var key = folderKeys[i]
//       var config = JSON.parse(readFileSync('./api/connections/' + key + '/config.json', 'utf8'))

//       config._id = key
//       config.isActive = false

//       Connections.update({_id: key}, config, {upsert: true})
//     }
//   })
// }

module.exports = function (io) {
  //loadNewConnections()

  require('./controllers/alertController')(router, io)
  require('./controllers/connectionController')(router)
  // require('./controllers/ruleController')(router)
  // require('./controllers/userController')(router)

  return router
}
