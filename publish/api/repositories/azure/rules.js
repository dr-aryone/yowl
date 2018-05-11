var azure = require('azure-storage')
var accountName = 'naenglerazurestorage'
var accountKey = 'e2MWTtaduhSLwCRc62+BoqVtUvLnBvKHbojLRhKB7uvsDtZ8rI6pBJi2+oJwNQgkpAq4QotUN3lrdapMmwPfCw=='
var tableName = 'rules'
var options = { payloadFormat: 'application/json;odata=nometadata' }

var makeid = function () {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

var convertRuleToRow = function (id, rule) {
  var entGen = azure.TableUtilities.entityGenerator

  return {
    PartitionKey: entGen.String(id),
    RowKey: entGen.String(id),
    application: entGen.String(rule.application),
    errorCode: entGen.String(rule.errorCode),
    keywords: entGen.String(rule.keywords),
    severity: entGen.String(rule.severity),
    broadcastType: entGen.String(rule.broadcastType)
  }
}

var fixResponse = function (response) {
  response._id = response.RowKey

  Reflect.deleteProperty(response, 'PartitionKey')
  Reflect.deleteProperty(response, 'RowKey')
  Reflect.deleteProperty(response, 'Timestamp')

  return response
}

exports.get = function (id) {
  var table = azure.createTableService(accountName, accountKey)

  return new Promise((resolve, reject) => {
    table.retrieveEntity(tableName, id, id, options, function (err, result, response) {
      if (!err) {
        reject(err)
        return
      }

      var resp = fixResponse(response.body.value)

      resolve(resp)
    })
  })
}

exports.getAll = function () {
  var table = azure.createTableService(accountName, accountKey)
  var query = new azure.TableQuery()

  return new Promise((resolve, reject) => {
    table.queryEntities(tableName, query, null, options, function (err, result, response) {
      if (err) {
        reject(err)
        return
      }

      response.body.value.forEach((el, idx) => {
        response.body.value[idx] = fixResponse(response.body.value[idx])
      })

      resolve(response.body.value)
    })
  })
}

exports.create = function (rule) {
  var table = azure.createTableService(accountName, accountKey)
  var id = makeid()
  var entity = convertRuleToRow(id, rule)

  return new Promise((resolve, reject) => {
    table.insertEntity(tableName, entity, function (err, result, response) {
      if (err) {
        reject(err)
        return
      }

      rule._id = id

      resolve(rule)
    })
  })
}

exports.delete = function (rule) {
  var table = azure.createTableService(accountName, accountKey)
  var entity = convertRuleToRow(rule._id, rule)

  return new Promise((resolve, reject) => {
    table.deleteEntity(tableName, entity, function (err) {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}

exports.update = function (rule) {
  var table = azure.createTableService(accountName, accountKey)
  var id = rule._id || makeid()
  var entity = convertRuleToRow(id, rule)

  return new Promise((resolve, reject) => {
    table.insertOrReplaceEntity(tableName, entity, function (err, result, response) {
      if (!err) {
        reject(err)
        return
      }

      rule._id = id

      resolve(rule)
    })
  })
}
