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

    var sql = 'SELECT * FROM tags t INNER JOIN videos_tags bt ON t.id = bt.tag_id WHERE bt.video_id = ' + event.video_id + ' ORDER BY t.Name';
    connection.query(sql, function (error, results, fields) {
    callback( null, results );
  });
});