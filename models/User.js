const { Model } = require("objection");
const db = require('../config/database'); 
const tableName = require('../data/migrations/20200527150009_createUsers').tableName; 
const Meeting = require('./Meeting')
// objection js - provides all model information
Model.knex(db); 

class User extends Model {
    static get TableName(){
        return tableName; 
    }
    static relationMappings = {
        meetings: {
            modelClass: Meeting,
            relation: Model.ManyToManyRelation,
            join: {
                from: "user.id", 
                through: {
                    from: "meeeting_attendee.user_id", 
                    to: "meeting_attendee.meeting_id",
                }, 
            },
            to: "meeting.id"
        }
    }
}

exports.User 