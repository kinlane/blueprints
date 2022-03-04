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

    connection.query('SELECT * FROM blueprints', function (error, blueprints, fields) {

      for (let i = 0; i < blueprints.length; i++) {
        
        connection.query('SELECT * FROM blueprints_areas WHERE id = ' + blueprints[i].blueprints_id, function (error, areas, fields) {

          blueprints.areas = areas

        });

      }

      callback( null, results );

    });
});