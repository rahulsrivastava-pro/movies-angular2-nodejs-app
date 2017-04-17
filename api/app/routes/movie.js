var _movieController = require('../controllers/movieController.js');

module.exports = function (apiRoutes) {
    'use strict';


    apiRoutes.get('/movie', function (req, res) {
        _movieController.getMovie(req, res);
    });

    apiRoutes.get('/movie/:id', function (req, res) {
        _movieController.getMovieById(req, res);
    });

    apiRoutes.post('/movie', function (req, res) {
        _movieController.createMovie(req, res);
    });

    apiRoutes.put('/movie/:id', function (req, res) {
        _movieController.updateMovie(req, res);
    });

    apiRoutes.delete('/movie/:id', function (req, res) {
        _movieController.removeMovie(req, res);
    });
};
