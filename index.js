var sql = require('mssql'),
    local = require('./modules/local'),
    connection = new sql.Connection(local.SQLSERVER);


// exports.itPipes = function (req, res){


  connection.connect().then(function() {

      var reqVideo = new sql.Request(connection);
      var reqImages = new sql.Request(connection);

      reqVideo.query(local.QUERIES.video).then(function(recordset_video) {
        var sql = local.QUERIES.images + recordset_video[0].MLI_ID;
         return {data: recordset_video[0], imageSQL: sql};
     })
     .then(function(data){
       reqImages.query(data.imageSQL).then(function(recordset_images){
         console.dir({
           video: data.data,
           images: recordset_images
         });
         return {
           video: data.data,
           images: recordset_images
         }
       }).catch(function(err){
         console.log(err);
       });
     }).catch(function(err){
       console.log(err);
     });
  }).catch(function(err){
    console.log(err);
  });

// }
