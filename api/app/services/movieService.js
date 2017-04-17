var mongoose = require('mongoose');
var Movie = require('../models/movie'); // get our mongoose model



var getMovie = function () {
    var docs = null;
    return Movie.find({}, function (err, docs) {
        if (err) return console.error(err);
        return docs;
    });
}


var getMovieById = function (id) {
    var obj = null;
    return Movie.findOne({ movie_id: id }, function (err, obj) {
        if (err) return console.error(err);
        return obj;
    });
}


var getMovieByName = function (_name) {
    var obj = null;
    return Movie.findOne({ name: _name }, function (err, obj) {
        if (err) return console.error(err);
        return obj;
    });
}


var createMovie = function (_name, _description, _year, _rating) {
    var movieId = 1;
    return Movie.findOne().sort({ field: 'asc', _id: -1 }).limit(1).exec(function (err, post) {
            var lastDoc = post;
            if (lastDoc != null) {
                movieId = parseInt(lastDoc.movie_id) + 1;
            }
            var movie = new Movie({ movie_id: movieId, name: _name, description: _description, year: _year, rating: _rating });
            return movie.save(function (err) {
                if (err) {
                    console.log("Something wrong when creating movie.");
                }
                else {
                    console.log('movie created successfully');
                }
            });
        });
}

var updateMovie = function (movieId, _body) {
    var obj = null;
    
    var _name = null;
    var _description = null;
    var _year = null;
    var _rating = null;

    return Movie.findOne({ movie_id: movieId }, function (err, obj) {
        if (err) return console.error(err);
        if (obj != null) {
            if (_body == null) {
                _body == obj;
            } else {
                _name = (_body.name == null) ? obj.name : _body.name;
                _description = (_body.description == null) ? obj.description : _body.description;
                _year = (_body.year == null) ? obj.year : _body.year;
                _rating = (_body.rating == null) ? obj.rating : _body.rating;
            }
            return Movie.findOneAndUpdate({ movie_id: movieId }, { $set: { name: _name, description: _description, year: _year, rating: _rating } }, { upsert: true, new: true }, function (err, doc) {
                if (err) {
                    console.log("Something wrong when updating movie.");
                }
                else {
                    console.log('Movie  updated successfully');
                }
            });
        }
    });
}

var removeMovie = function (movieId) {
    return Movie.findOneAndRemove({ movie_id: movieId }, function (err) {
        if (err) return console.error(err);
    });
}



module.exports = {
    getMovie: getMovie,
    getMovieById: getMovieById,
    getMovieByName : getMovieByName,
    createMovie: createMovie,
    updateMovie: updateMovie,
    removeMovie: removeMovie
};

