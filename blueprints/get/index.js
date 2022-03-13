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
    
    var search = 0;
    if(event.search){
      search = event.search;
    }    
    
    var page = 0;
    if(event.page){
      page = event.page;
    }
    
    var limit = 5;
    if(event.limit){
      limit = event.limit;
    }   
    if(limit > 25){
      limit = 25;
    }

  if(search != ''){
    var sql = "SELECT * FROM blueprints WHERE name LIKE '%" + search + "%' LIMIT " + event.page + "," + event.limit;
  }
  else{
    var sql = "SELECT * FROM blueprints LIMIT " + event.page + "," + event.limit; 
  }
    connection.query(sql, function (error, results, fields) {

    callback( null, results );

  });
});