var _directorController = require('../controllers/directorController.js');

module.exports = function (apiRoutes) {
    'use strict';


    apiRoutes.get('/director', function (req, res) {
        _directorController.getDirector(req, res);
    });

    apiRoutes.get('/director/:id', function (req, res) {
        _directorController.getDirectorById(req, res);
    });

    apiRoutes.post('/director', function (req, res) {
        _directorController.createDirector(req, res);
    });

    apiRoutes.put('/director/:id', function (req, res) {
        _directorController.updateDirector(req, res);
    });

    apiRoutes.delete('/director/:id', function (req, res) {
        _directorController.removeDirector(req, res);
    });
};
