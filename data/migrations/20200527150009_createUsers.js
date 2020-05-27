
exports.up = function(knex) {
    return knex.schema.createTable("user", table => {
        table.increments()        // autoincrementing id 
        table.string("username")      // the meeting name 
        table.string("password_digest")  // the meeting location 
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user"); 
};
