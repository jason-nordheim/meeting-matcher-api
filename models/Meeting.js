const { Model } = require("objection");
const db = require('../config/database'); 
const tableName = require('../data/migrations/20200527151946_meetings').tableName; 

// objection js - provides all model information
Model.knex(db); 

class Meeting {
    static get tableName(){
        return tableName; 
    }
}

exports.Meeting; 