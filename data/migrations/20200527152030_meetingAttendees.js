const tableName = "meeting_attendee"

exports.up = function(knex) {
    return knex.schema.createTable(tableName, table => {
        table.increments()        // autoincrementing id 
        table.integer("user_id").references("id").inTable("user")
        table.integer("meeting_id").references("id").inTable("meeting")
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists(tableName)
  }
  
  exports.tableName; 