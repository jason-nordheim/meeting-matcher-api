const config = require('../knexfile')[process.env.NODE_ENV || "development"] 
const knex = require("knex")
const database = knex(config)


module.exports = database