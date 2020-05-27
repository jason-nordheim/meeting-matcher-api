const tableName = "meeting"

exports.up = function(knex) {
    return knex.schema.createTable(tableName, table => {
        table.increments()        // autoincrementing id 
        table.string("name")      // the meeting name 
        table.string("location")  // the meeting location 
        table.datetime("start")   // start time of the meeting 
        table.datetime("end")     // end time of the meeting 
        table.integer("created_by").references("id").inTable("user")
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists(tableName)
  }
  