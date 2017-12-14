'use strict';

var Datastore = require('nedb');

var alertsDb = new Datastore({
  filename: __dirname + '/../db/alerts.db',
  autoload: true
});

module.exports = alertsDb;