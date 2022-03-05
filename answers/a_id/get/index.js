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

    var sql = 'SELECT * FROM answers WHERE id = ' + connection.escape(event.answer_id);
    connection.query(sql, function (error, results, fields) {

    callback( null, results );

  });
});