var azure = require("azure-storage");
var accountName = "naenglerazurestorage";
var accountKey = "e2MWTtaduhSLwCRc62+BoqVtUvLnBvKHbojLRhKB7uvsDtZ8rI6pBJi2+oJwNQgkpAq4QotUN3lrdapMmwPfCw==";
var tableName = "connections";

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

function convertConnToRow(id, conn) {
    var entGen = azure.TableUtilities.entityGenerator;

    return {
        PartitionKey: entGen.String(id),
        RowKey: entGen.String(id),
        name: conn.name,
        isActive: conn.isActive
    };
}

function convertRowToConn(row) {
    return {
        _id: row.RowKey._,
        name: row.name._,
        isActive: row.isActive._
    };
}

exports.get = function (id) {
    var table = azure.createTableService(accountName, accountKey);

    return new Promise((resolve, reject) => {        
        table.retrieveEntity(tableName, id, id, function(err, result, response) {
            if (!err) {
              reject(err);
              return;
            }

            var alert = convertRowToConn(result);
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

            var connections = [];
            for (var i in result.entries) {
                connections.push(convertRowToConn(result.entries[i]));
            }

            resolve(connections);
        });
    });    
}

exports.update = function (connection) {
    var table = azure.createTableService(accountName, accountKey);    
    var id = connection._id || makeid();
    var entity = convertConnectionToRow(id, connection);

    return new Promise((resolve, reject) => {
        table.insertOrReplaceEntity(tableName, entity, function(err, result, response) {
            if (!err) {
                reject(err);
                return;
            }

            connection._id = id;

            resolve(connection);
        });
    });
}