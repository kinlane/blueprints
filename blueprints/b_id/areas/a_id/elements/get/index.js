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

  var sql = 'SELECT e.id as id, e.name as name, bae.label as label, e.description as description FROM blueprints_areas_elements bae INNER JOIN elements e ON bae.element_id = e.id WHERE blueprints_areas_id = ' + event.area_id;
    connection.query(sql, function (error, results, fields) {

    callback( null, results );

  });
});