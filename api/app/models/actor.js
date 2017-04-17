// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Actor', new Schema({
    actor_id: Number,
    name: String, 
    age: Number,
    gender: String,
    agent: String,
    agency: String 
}));