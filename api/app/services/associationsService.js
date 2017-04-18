var mongoose = require('mongoose');
var Movie = require('../models/movie');
var Actor = require('../models/actor');
var Director = require('../models/director');
var Movieactor = require('../models/movieActor');
var Moviedirector = require('../models/movieDirector');

 

var getActorsInMovie = function (movieId, res) {
    var actorsArr = [];
    var actorsSelected = [];
    Movieactor.find({ movie_id: movieId }).lean().exec(function (err, actorsInMovie) {
        actorsArr = actorsInMovie;
        Actor.find({}).lean().exec(function (err, actors) {
            for (var i = 0; i < actors.length; i++) {
                for (var j in actorsArr) {
                    if (actorsArr[j].actor_id == actors[i].actor_id) {
                        actorsSelected.push(actors[i]);
                    }
                }
            }
            return res.end(JSON.stringify(actorsSelected));
        });
    });
    return null;
}

var getMoviesByActor = function (actorId) {
    var moviesArr = [];
    var moviesSelected = [];

    Movieactor.find({ actor_id: actorId }).lean().exec(function (err, moviesByActor) {
        moviesArr = moviesByActor;
        Movie.find({}).lean().exec(function (err, movies) {
            for (var i = 0; i < movies.length; i++) {
                for (var j in moviesArr) {
                    if (moviesArr[j].movie_id == movies[i].movie_id) {
                        moviesSelected.push(movies[i]);
                    }
                }
            }
            return JSON.stringify(moviesSelected);
        });
    });
    return null;
}

var createMovieActor = function (movieId, actorId) {
    var movieActor = new Movieactor({ movie_id: movieId, actor_id: actorId });
    return movieActor.save(function (err) {
                if (err) {
                    console.log("Something wrong when creating movie-actor association.");
                }
                else {
                    console.log('movie-actor association created successfully');
                }
            });
}

var removeMovieActor = function (movieId, actorId) {
    return Movieactor.findOneAndRemove({ movie_id: movieId, actor_id: actorId }, function (err) {
        if (err) return console.error(err);
    });
}

var getDirectorsInMovie = function (movieId, res) {
    var directorsArr = [];
    var directorsSelected = [];
    Moviedirector.find({ movie_id: movieId }).lean().exec(function (err, directorsInMovie) {
        directorsArr = directorsInMovie;
        Director.find({}).lean().exec(function (err, directors) {
            for (var i = 0; i < directors.length; i++) {
                for (var j in directorsArr) {
                    if (directorsArr[j].director_id == directors[i].director_id) {
                        directorsSelected.push(directors[i]);
                    }
                }
            }
            return res.end(JSON.stringify(directorsSelected));
        });
    });
    return null;
}

var getMoviesByDirector = function (directorId) {
    var moviesArr = [];
    var moviesSelected = [];

    Moviedirector.find({ director_id: directorId }).lean().exec(function (err, moviesByDirector) {
        moviesArr = moviesByDirector;
        Movie.find({}).lean().exec(function (err, movies) {
            for (var i = 0; i < movies.length; i++) {
                for (var j in moviesArr) {
                    if (moviesArr[j].movie_id == movies[i].movie_id) {
                        moviesSelected.push(movies[i]);
                    }
                }
            }
            return JSON.stringify(moviesSelected);
        });
    });
    return null;
}

var createMovieDirector = function (movieId, directorId) {
    var movieDirector = new Movieactor({ movie_id: movieId, director_id: directorId });
    return movieDirector.save(function (err) {
        if (err) {
            console.log("Something wrong when creating movie-director association.");
        }
        else {
            console.log('movie-director association created successfully');
        }
    });
}

var removeMovieDirector = function (movieId, directorId) {
    return Moviedirector.findOneAndRemove({ movie_id: movieId, director_id: directorId }, function (err) {
        if (err) return console.error(err);
    });
}

module.exports = {
    getMoviesByActor: getMoviesByActor,
    getActorsInMovie: getActorsInMovie,
    createMovieActor: createMovieActor,
    removeMovieActor: removeMovieActor,
    getDirectorsInMovie: getDirectorsInMovie,
    getMoviesByDirector: getMoviesByDirector,
    createMovieDirector: createMovieDirector,
    removeMovieDirector: removeMovieDirector
};

