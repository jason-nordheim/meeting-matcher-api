const tableName = "user"; 

exports.up = function(knex) {
    return knex.schema.createTable(tableName, table => {
        table.increments()        // autoincrementing id 
        table.string("username")      // the meeting name 
        table.string("password_digest")  // the meeting location 
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName); 
};
