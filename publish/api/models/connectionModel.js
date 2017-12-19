'use strict'

var Datastore = require('nedb')
var path = require('path')

var connectionDb = new Datastore({
  filename: path.join(__dirname, '/../db/connections.db'),
  autoload: true
})

module.exports = connectionDb
