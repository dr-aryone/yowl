'use strict'

var Datastore = require('nedb')
var path = require('path')

var usersDb = new Datastore({
  filename: path.join(__dirname, '/../db/users.db'),
  autoload: true
})

module.exports = usersDb
