const vandium = require('vandium');
const mysql  = require('mysql');

exports.handler = vandium.generic()
  .handler( (event, context, callback) => {

    var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });
    
    var page = 0;
    if(event.page){
      page = event.page;
    }
    
    var limit = 25;
    if(event.limit){
      limit = event.limit;
    }   
    if(limit > 50){
      limit = 50;
    }

  var sql = 'SELECT * FROM tags ORDER BY name ASC LIMIT ' + event.page + ',' + event.limit;
    connection.query(sql, function (error, results, fields) {

    callback( null, results );

  });
});