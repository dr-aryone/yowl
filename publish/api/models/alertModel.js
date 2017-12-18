'use strict'

var Datastore = require('nedb')
var path = require('path')

var alertsDb = new Datastore({
  filename: path.join(__dirname, '/../db/alerts.db'),
  autoload: true
})

module.exports = alertsDb
