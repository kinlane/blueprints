const vandium = require('vandium');
const mysql  = require('mysql');
const async  = require('async');

exports.handler = vandium.generic()
  .handler( (event, context, callback) => {

    var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });

    connection.query('SELECT * FROM blueprints', function (error, blueprints, fields) {

      var b_count = 0;
      async.each(blueprints, function (blueprint, callback) {
        
        connection.query('SELECT * FROM blueprints_areas WHERE id = ' + blueprint.id, function (error, areas, fields) {

          // we don't need ids going out door
          for (let a = 0; a < areas.length; a++) {
            delete areas[a].id;
            delete areas[a].blueprint_id;
          }

          blueprints[b_count].areas = areas;
          
          var a_count = 0;
          async.each(area, function (area, callback) {
          
            console.log('SELECT * FROM blueprints_areas_elements WHERE id = ' + area.id);
            connection.query('SELECT * FROM blueprints_areas_elements WHERE id = ' + area.id, function (error, elements, fields) {
              
              console.log(elements);
              // we don't need ids going out door
              for (let e = 0; e < elements.length; e++) {
                delete elements[e].id;
                delete elements[e].blueprint_id;
              }
    
              blueprints[b_count].areas[a_count].elements = elements;
              
              callback( null, blueprints );
    
            });
          
          a_count++;
          });

        });

      b_count++;
      });

    });
});