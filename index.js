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

	connection.query('SELECT * FROM blueprints', function (error, results, fields) {

	callback( null, results );
		
  });
});