
exports.up = function(knex) {
  return knex.schema.createTable("user", table => {
      table.increments(); // incrementing key 
      table.string("username");  // username 
      table.string("password_digest"); // hashed password 
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("user"); 
  
};
