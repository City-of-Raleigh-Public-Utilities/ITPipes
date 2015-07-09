var sql = require('mssql'),
    local = require('./modules/local');



var connection = new sql.Connection(local.SQLSERVER);


connection.connect(function(err) {
    console.log(err);
    var request = new sql.Request(connection);
    request.query(local.QUERIES.findAllTables, function(err, recordset) {
       console.dir(recordset);
       console.log(recordset.length); // count of recordsets returned by the procedure

   });
});
