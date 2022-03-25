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


    connection.connect(function(err) {
      if (err) throw err;

      var sql = "SELECT * FROM links WHERE name = '" + event.name + "' LIMIT 1";
      connection.query(sql, function (err, result, fields) {
        if(result.length > 0){
          callback( null, result[0] ); 
        }
        else{


          var sql = 'INSERT INTO links(';
    
          var total_properties = Object.keys(event).length;
          
          var property_count = 1;
          for (const [key, value] of Object.entries(event)) {
            sql += key;
            if(property_count != total_properties){
              sql += ',';
            }
            property_count++;
          }
            
          sql += ')';
      
          sql += ' VALUES(';
          
          var property_count = 1;
          for (const [key, value] of Object.entries(event)) {
            sql += connection.escape(value);
            if(property_count != total_properties){
              sql += ',';
            }
            property_count++;
          }
      
          sql += ")";
        
          connection.query(sql, function (error, results, fields) {
        
            var inserted = {};
            inserted.id = results.insertId;
            inserted.name = event.name;
            inserted.description = event.description;
        
            callback( null, inserted );
      
          });          

        }
      });
    });

});