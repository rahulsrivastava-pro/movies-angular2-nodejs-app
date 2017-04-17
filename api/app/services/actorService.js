var mongoose = require('mongoose');
var Actor = require('../models/actor'); // get our mongoose model



var getActor = function () {
    var docs = null;
    return Actor.find({}, function (err, docs) {
        if (err) return console.error(err);
        return docs;
    });
}


var getActorById = function (id) {
    var obj = null;
    return Actor.findOne({ actor_id: id }, function (err, obj) {
        if (err) return console.error(err);
        return obj;
    });
}


var getActorByName = function (_name) {
    var obj = null;
    return Actor.findOne({ name: _name }, function (err, obj) {
        if (err) return console.error(err);
        return obj;
    });
}


var createActor = function (_name, _age, _gender, _agent, _agency) {
    var actorId = 1;
    return Actor.findOne().sort({ field: 'asc', _id: -1 }).limit(1).exec(function (err, post) {
        var lastDoc = post;
        if (lastDoc != null) {
            actorId = parseInt(lastDoc.actor_id) + 1;
        }
        var actor = new Actor({ actor_id: actorId, name: _name, age: _age, gender: _gender, agent: _agent, agency: _agency });
        return actor.save(function (err) {
            if (err) {
                console.log("Something wrong when creating actor.");
            }
            else {
                console.log('actor created successfully');
            }
        });
    });
}

var updateActor = function (actorId, _body) {
    var obj = null;

    var _name = null;
    var _age = null;
    var _gender = null;
    var _agent = null;
    var _agency = null;

    return Actor.findOne({ actor_id: actorId }, function (err, obj) {
        if (err) return console.error(err);
        if (obj != null) {
            if (_body == null) {
                _body = obj;
            } else {
                _name = (_body.name == null) ? obj.name : _body.name;
                _age = (_body.age == null) ? obj.age : _body.age;
                _gender = (_body.gender == null) ? obj.gender : _body.gender;
                _agent = (_body.agent == null) ? obj.agent : _body.agent;
                _agency = (_body.agency == null) ? obj.agency : _body.agency;
            }
            return Actor.findOneAndUpdate({ actor_id: actorId }, { $set: { name: _name, age: _age, gender: _gender, agent: _agent, agency: _agency } }, { upsert: true, new: true }, function (err, doc) {
                if (err) {
                    console.log("Something wrong when updating actor.");
                }
                else {
                    console.log('Actor  updated successfully');
                }
            });
        }
    });
}

var removeActor = function (actorId) {
    return Actor.findOneAndRemove({ actor_id: actorId }, function (err) {
        if (err) return console.error(err);
    });
}



module.exports = {
    getActor: getActor,
    getActorById: getActorById,
    getActorByName: getActorByName,
    createActor: createActor,
    updateActor: updateActor,
    removeActor: removeActor
};

