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

    sql = 'INSERT INTO blueprints(';
    
    var property_count = 0;
    for (const [key, value] of Object.entries( connection.escape(event.body))) {
      sql += key;
      if(property_count < event.body.length){
        sql += ',';
      }
    }
      
    sql += ')';

    sql += + " VALUES(";
    
    var property_count = 0;
    for (const [key, value] of Object.entries(event.body)) {
      sql += connection.escape(value);
      if(property_count < event.body.length){
        sql += ',';
      }
    }

    sql += ")";
  
    connection.query(sql, function (error, results, fields) {
  
      response = {};
      response['id'] = event.id;
      response['name'] = event.name;

    callback( null, results );

  });
});