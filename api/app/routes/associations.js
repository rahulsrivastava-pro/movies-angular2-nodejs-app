var _associationsController = require('../controllers/associationsController.js');

module.exports = function (apiRoutes) {
    'use strict';


    apiRoutes.get('/getActorsInMovie/:id', function (req, res) {
        _associationsController.getActorsInMovie(req, res);
    });

    apiRoutes.get('/getMoviesByActor/:id', function (req, res) {
        _associationsController.getMoviesByActor(req, res);
    });

    apiRoutes.post('/associateMovieActor', function (req, res) {
        _associationsController.createMovieActor(req, res);
    });

    apiRoutes.delete('/disassociateMovieActor/:movie_id/:actor_id', function (req, res) {
        _associationsController.removeMovieActor(req, res);
    });

    apiRoutes.get('/getDirectorsInMovie/:id', function (req, res) {
        _associationsController.getDirectorsInMovie(req, res);
    });

    apiRoutes.get('/getMoviesByDirector/:id', function (req, res) {
        _associationsController.getMoviesByDirector(req, res);
    });

    apiRoutes.post('/associateMovieDirector', function (req, res) {
        _associationsController.createMovieDirector(req, res);
    });

    apiRoutes.delete('/disassociateMovieDirector/:movie_id/:director_id', function (req, res) {
        _associationsController.removeMovieDirector(req, res);
    });
};
