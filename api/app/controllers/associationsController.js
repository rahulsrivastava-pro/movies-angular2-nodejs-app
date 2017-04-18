var _associationService = require('../services/associationsService.js');


var getActorsInMovie = function (req, res) {
        if (req.params.id < 1 || req.params.id == null) {
            res.status(500);
            res.json("Please provide a valid Id.");
            return res;
        }
        return _associationService.getActorsInMovie(req.params.id, res);
}

var getMoviesByActor = function (req, res) {
    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }
    var associations = _associationService.getMoviesByActor(req.params.id);
    return associations;
}

var createMovieActor = function (req, res) {
    // validations
    if (req.body.movie_id < 1 || req.body.movie_id == "" || req.body.movie_id == null)
    {
        res.status(500);
        res.json("Please provide a valid Movie ID.");
        return res;
    }
    if (req.body.actor_id < 1 || req.body.actor_id == "" || req.body.actor_id == null) {
        res.status(500);
        res.json("Please provide a valid Actor ID.");
        return res;
    }
    return _associationService.createMovieActor(req.body.movie_id, req.body.actor_id).then(function (r) {
                res.sendStatus(201); // created
                return res;
            });
     
}

var removeMovieActor = function (req, res) {

    if (req.params.movie_id < 1 || req.params.movie_id == "" || req.params.movie_id == null) {
        res.status(500);
        res.json("Please provide a valid Movie ID.");
        return res;
    }
    if (req.params.actor_id < 1 || req.params.actor_id == "" || req.params.actor_id == null) {
        res.status(500);
        res.json("Please provide a valid Actor ID.");
        return res;
    }

   
    return _associationService.removeMovieActor(req.params.movie_id, req.params.actor_id).then(function (err, r) {
                if (!err) {
                    res.sendStatus(200); //ok
                } else {
                    res.sendStatus(404);// not found
                }
                return res;
            });
        
}

var getDirectorsInMovie = function (req, res) {
    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }
    return _associationService.getDirectorsInMovie(req.params.id, res);
}

var getMoviesByDirector = function (req, res) {
    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }
    var associations = _associationService.getMoviesByDirector(req.params.id);
    return associations;
}

var createMovieDirector = function (req, res) {
    // validations
    if (req.body.movie_id < 1 || req.body.movie_id == "" || req.body.movie_id == null) {
        res.status(500);
        res.json("Please provide a valid Movie ID.");
        return res;
    }
    if (req.body.director_id < 1 || req.body.director_id == "" || req.body.director_id == null) {
        res.status(500);
        res.json("Please provide a valid Director ID.");
        return res;
    }
    return _associationService.createMovieDirector(req.body.movie_id, req.body.director_id).then(function (r) {
        res.sendStatus(201); // created
        return res;
    });

}

var removeMovieDirector = function (req, res) {

    if (req.params.movie_id < 1 || req.params.movie_id == "" || req.params.movie_id == null) {
        res.status(500);
        res.json("Please provide a valid Movie ID.");
        return res;
    }
    if (req.params.director_id < 1 || req.params.director_id == "" || req.params.director_id == null) {
        res.status(500);
        res.json("Please provide a valid Director ID.");
        return res;
    }


    return _associationService.removeMovieDirector(req.params.movie_id, req.params.director_id).then(function (err, r) {
        if (!err) {
            res.sendStatus(200); //ok
        } else {
            res.sendStatus(404);// not found
        }
        return res;
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