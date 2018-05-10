var azure = require("azure-storage");
var accountName = "naenglerazurestorage";
var accountKey = "e2MWTtaduhSLwCRc62+BoqVtUvLnBvKHbojLRhKB7uvsDtZ8rI6pBJi2+oJwNQgkpAq4QotUN3lrdapMmwPfCw==";
var tableName = "alerts";

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

function convertAlertToRow(id, alert) {
    var entGen = azure.TableUtilities.entityGenerator;

    return {
        PartitionKey: entGen.String(id),
        RowKey: entGen.String(id),
        application: entGen.String(alert.application),
        errorCode: entGen.String(alert.errorCode),
        message: entGen.String(alert.message),
        severity: entGen.String(alert.severity),
        count: entGen.Int32(alert.count || 0)   
    };
}

function convertRowToAlert(row) {
    return {
        _id: row.RowKey._,
        application: row.application._,
        errorCode: row.errorCode._,
        message: row.message._,
        severity: row.severity._,
        count: row.count ? row.count._ : 0
    };
}

exports.find = function (application, errorCode) {
    var table = azure.createTableService(accountName, accountKey);
    var query = new azure.TableQuery()
        .where('application eq ? and errorCode eq ?', application, errorCode);
    
    return new Promise((resolve, reject) => {        
        table.queryEntities(tableName, query, null, function (err, result, response) {
            if (err) {
                reject(err);
                return;
            }

            if (result.entries.length == 0) {
                resolve(null);
                return;
            }

            var alert = convertRowToAlert(result.entries[0]);

            resolve(alert);
        });
    });    
}

exports.get = function (id) {
    var table = azure.createTableService(accountName, accountKey);

    return new Promise((resolve, reject) => {        
        table.retrieveEntity(tableName, id, id, function(err, result, response) {
            if (!err) {
              reject(err);
              return;
            }

            var alert = convertRowToAlert(result);
            resolve(alert);
        });
    });
}

exports.getAll = function () {
    var table = azure.createTableService(accountName, accountKey);
    var query = new azure.TableQuery();

    return new Promise((resolve, reject) => {        
        table.queryEntities(tableName, query, null, function (err, result, response) {
            if (err) {
                reject(err);
                return;
            }

            var alerts = [];
            for (var i in result.entries) {
                alerts.push(convertRowToAlert(result.entries[i]));
            }

            resolve(alerts);
        });
    });    
}

exports.create = function (alert) {
    var table = azure.createTableService(accountName, accountKey);    
    var id = makeid();
    var entity = convertAlertToRow(id, alert);

    return new Promise((resolve, reject) => {
        table.insertEntity(tableName, entity, function(err, result, response) {
            if (err) {                
                reject(err);
                return;
            }

            alert._id = id;
            
            resolve(alert);
        });
    });
}

exports.delete = function (alert) {
    var table = azure.createTableService(accountName, accountKey);
    var entity = convertAlertToRow(alert._id, alert);

    return new Promise((resolve, reject) => {
        table.deleteEntity(tableName, entity, function(err) {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        })
    });
}

exports.update = function (alert) {
    var table = azure.createTableService(accountName, accountKey);    
    var id = alert._id || makeid();
    var entity = convertAlertToRow(id, alert);

    return new Promise((resolve, reject) => {
        table.insertOrReplaceEntity(tableName, entity, function(err, result, response) {
            if (!err) {
                reject(err);
                return;
            }

            alert._id = id;

            resolve(alert);
        });
    });
}