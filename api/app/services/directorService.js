var mongoose = require('mongoose');
var Director = require('../models/director'); // get our mongoose model



var getDirector = function () {
    var docs = null;
    return Director.find({}, function (err, docs) {
        if (err) return console.error(err);
        return docs;
    });
}


var getDirectorById = function (id) {
    var obj = null;
    return Director.findOne({ director_id: id }, function (err, obj) {
        if (err) return console.error(err);
        return obj;
    });
}


var getDirectorByName = function (_name) {
    var obj = null;
    return Director.findOne({ name: _name }, function (err, obj) {
        if (err) return console.error(err);
        return obj;
    });
}


var createDirector = function (_name, _age, _gender) {
    var directorId = 1;
    return Director.findOne().sort({ field: 'asc', _id: -1 }).limit(1).exec(function (err, post) {
        var lastDoc = post;
        if (lastDoc != null) {
            directorId = parseInt(lastDoc.director_id) + 1;
        }
        var director = new Director({ director_id: directorId, name: _name, age: _age, gender: _gender});
        return director.save(function (err) {
            if (err) {
                console.log("Something wrong when creating director.");
            }
            else {
                console.log('director created successfully');
            }
        });
    });
}

var updateDirector = function (directorId, _body) {
    var obj = null;

    var _name = null;
    var _age = null;
    var _gender = null;

    return Director.findOne({ director_id: directorId }, function (err, obj) {
        if (err) return console.error(err);
        if (obj != null) {
            if (_body == null) {
                _body = obj;
            } else {
                _name = (_body.name == null) ? obj.name : _body.name;
                _age = (_body.age == null) ? obj.age : _body.age;
                _gender = (_body.gender == null) ? obj.gender : _body.gender;
            }
            return Director.findOneAndUpdate({ director_id: directorId }, { $set: { name: _name, age: _age, gender: _gender } }, { upsert: true, new: true }, function (err, doc) {
                if (err) {
                    console.log("Something wrong when updating director.");
                }
                else {
                    console.log('Director  updated successfully');
                }
            });
        }
    });
}

var removeDirector = function (directorId) {
    return Director.findOneAndRemove({ director_id: directorId }, function (err) {
        if (err) return console.error(err);
    });
}



module.exports = {
    getDirector: getDirector,
    getDirectorById: getDirectorById,
    getDirectorByName: getDirectorByName,
    createDirector: createDirector,
    updateDirector: updateDirector,
    removeDirector: removeDirector
};

