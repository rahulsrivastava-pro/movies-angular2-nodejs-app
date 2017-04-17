var _directorController = require('../controllers/directorController.js');

module.exports = function (apiRoutes) {
    'use strict';


    apiRoutes.get('/actor', function (req, res) {
        _directorController.getDirector(req, res);
    });

    apiRoutes.get('/actor/:id', function (req, res) {
        _directorController.getDirectorById(req, res);
    });

    apiRoutes.post('/actor', function (req, res) {
        _directorController.createDirector(req, res);
    });

    apiRoutes.put('/actor/:id', function (req, res) {
        _directorController.updateDirector(req, res);
    });

    apiRoutes.delete('/actor/:id', function (req, res) {
        _directorController.removeDirector(req, res);
    });
};
