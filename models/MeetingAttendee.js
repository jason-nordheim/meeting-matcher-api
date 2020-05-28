const { Model } = require("objection");
const db = require('../config/database'); 
const tableName = require('../data/migrations/20200527152030_meetingAttendees').tableName; 

// objection js - provides all model information
Model.knex(db); 

class MeetingAttendee {
    static get tableName(){
        return tableName; 
    }
}

exports.Meeting; 