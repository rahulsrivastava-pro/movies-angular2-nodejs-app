var _movieService = require('../services/movieService.js');


var getMovie = function (req, res) {
    return _movieService.getMovie().then(function (r) {
            if (r !== null) {
                res.status(200);
                res.json(r);
            }
            else
            {
                res.sendStatus(404);
            }
            return res;
        });
}

var getMovieById = function (req, res) {

        if (req.params.id < 1 || req.params.id == null) {
            res.status(500);
            res.json("Please provide a valid Id.");
            return res;
        }
        return _movieService.getMovieById(req.params.id).then(function (r) {
            if (r !== null) {
                res.status(200);
                res.json(r);
            }
            else {
                res.sendStatus(404);
            }
            return res;
        });
}

var createMovie = function (req, res) {
    // validations
    if (req.body.name == "" || req.body.name == null)
    {
        res.status(500);
        res.json("Please provide a valid name");
        return res;
    }

    if (req.body.year > 2017 || req.body.year < 1800 || req.body.year == null) {
        res.status(500);
        res.json("Please provide a valid year (1800 - 2017)");
        return res;
    }

    if (req.body.rating > 5 || req.body.rating < 1 || req.body.rating == null) {
        res.status(500);
        res.json("Please provide a valid rating (1 - 5)");
        return res;
    }

    _movieService.getMovieByName(req.body.name).then(function (r) {
        if (r !== null) {
            res.status(500);
            res.json("Movie with this name already exists.");
            return res;
        }
        else {
            return _movieService.createMovie(req.body.name, req.body.description, req.body.year, req.body.rating).then(function (r) {
                res.sendStatus(201); // created
                return res;
            });
        }
    });
}

var updateMovie = function (req, res) {

    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }

    _movieService.getMovieById(req.params.id).then(function (r) {
        if (r == null) {
            res.status(404);
            res.json("Movie with the given id doesnot exists.");
            return res;
        }
        else
        {
            return _movieService.updateMovie(req.params.id, req.body).then(function (r) {
                if (r) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);// not found
                }
                return res;
            });
        }
    });
}


var removeMovie = function (req, res) {

    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }

    _movieService.getMovieById(req.params.id).then(function (r) {
        if (r == null) {
            res.status(404);
            res.json("Movie with the given id doesnot exists.");
            return res;
        }
        else {
            return _movieService.removeMovie(req.params.id).then(function (err, r) {
                if (!err) {
                    res.sendStatus(200); //ok
                } else {
                    res.sendStatus(404);// not found
                }
                return res;
            });
        }

    });
}

module.exports = {
    getMovie: getMovie,
    getMovieById: getMovieById,
    createMovie: createMovie,
    updateMovie: updateMovie,
    removeMovie: removeMovie
};