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

    sql = 'UPDATE blueprints SET';
    
    var property_count = 0;
    for (const [key, value] of Object.entries( connection.escape(event.body))) {
      sql += key + " = '" + value + "'";
      if(property_count < event.body.length){
        sql += ',';
      }
    }

    sql += " WHERE id = " + connection.escape(event.body.id);
  
    connection.query(sql, function (error, results, fields) {
  
      response = {};
      response['id'] = event.id;
      response['name'] = event.name;

    callback( null, results );

  });
});