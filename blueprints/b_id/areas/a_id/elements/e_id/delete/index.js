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

    var sql = 'DELETE FROM blueprints_areas_elements WHERE blueprints_areas_id = ' + connection.escape(event.area_id) + ' AND element_id = ' + connection.escape(event.element_id);
    connection.query(sql, function (error, results, fields) {

    callback( null, sql );

  });
});