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
        _associationsController.removeMovie(req, res);
    });
};
