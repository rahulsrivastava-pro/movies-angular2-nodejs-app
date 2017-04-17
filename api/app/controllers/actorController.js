var _actorService = require('../services/actorService.js');


var getActor = function (req, res) {
    return _actorService.getActor().then(function (r) {
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

var getActorById = function (req, res) {

    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }
    return _actorService.getActorById(req.params.id).then(function (r) {
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

var createActor = function (req, res) {
    // validations
    if (req.body.name == "" || req.body.name == null) {
        res.status(500);
        res.json("Please provide a valid name");
        return res;
    }

    if (req.body.age < 0 || req.body.age > 125 || req.body.age == null) {
        res.status(500);
        res.json("Please provide a valid age (0 - 125)");
        return res;
    }

    if (!(req.body.gender === "M" || req.body.gender === "F")) {
        res.status(500);
        res.json("Please provide a valid gender (M or F)");
        return res;
    }

    _actorService.getActorByName(req.body.name).then(function (r) {
        if (r !== null) {
            res.status(500);
            res.json("Actor with this name already exists.");
            return res;
        }
        else {
            return _actorService.createActor(req.body.name, req.body.age, req.body.gender, req.body.agent, req.body.agency).then(function (r) {
                res.sendStatus(201); // created
                return res;
            });
        }
    });
}

var updateActor = function (req, res) {

    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }

    _actorService.getActorById(req.params.id).then(function (r) {
        if (r == null) {
            res.status(404);
            res.json("Actor with the given id doesnot exists.");
            return res;
        }
        else {
            return _actorService.updateActor(req.params.id, req.body).then(function (r) {
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


var removeActor = function (req, res) {

    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }

    _actorService.getActorById(req.params.id).then(function (r) {
        if (r == null) {
            res.status(404);
            res.json("Actor with the given id doesnot exists.");
            return res;
        }
        else {
            return _actorService.removeActor(req.params.id).then(function (err, r) {
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
    getActor: getActor,
    getActorById: getActorById,
    createActor: createActor,
    updateActor: updateActor,
    removeActor: removeActor
};