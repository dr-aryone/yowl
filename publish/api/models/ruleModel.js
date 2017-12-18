'use strict'

var Datastore = require('nedb')
var path = require('path')

var rulesDb = new Datastore({
  filename: path.join(__dirname, '/../db/rules.db'),
  autoload: true
})

module.exports = rulesDb
