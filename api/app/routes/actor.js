var _actorController = require('../controllers/actorController.js');

module.exports = function (apiRoutes) {
    'use strict';


    apiRoutes.get('/actor', function (req, res) {
        _actorController.getActor(req, res);
    });

    apiRoutes.get('/actor/:id', function (req, res) {
        _actorController.getActorById(req, res);
    });

    apiRoutes.post('/actor', function (req, res) {
        _actorController.createActor(req, res);
    });

    apiRoutes.put('/actor/:id', function (req, res) {
        _actorController.updateActor(req, res);
    });

    apiRoutes.delete('/actor/:id', function (req, res) {
        _actorController.removeActor(req, res);
    });
};
