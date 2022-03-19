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
    
    var tags = 0;
    if(event.tags){
      tags = event.tags;
    }   
    
    var role = 0;
    if(event.role){
      role = event.role;
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

    var sql = "SELECT * FROM blueprints b WHERE id IS NOT NULL";
    if(search != ''){
       sql += " AND b.name LIKE '%" + search + "%'";
    }
    if(role != ''){
       sql += " AND id IN(SELECT blueprint_id FROM blueprints_roles WHERE role_id IN(SELECT id FROM roles WHERE name = '" + role + "'))";
    }   
    if(tags != ''){
       sql += " AND id IN(SELECT blueprint_id FROM blueprints_tags WHERE tag_id IN(SELECT id FROM tags WHERE name IN ('" + tags.replace(",","','") + "')))";
    }     
    sql += " ORDER BY Level";
    sql += " LIMIT " + event.page + "," + event.limit;
    connection.query(sql, function (error, results, fields) {

    callback( null, results );

  });
});