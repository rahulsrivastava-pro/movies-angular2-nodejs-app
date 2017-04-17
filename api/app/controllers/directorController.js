var _directorService = require('../services/directorService.js');


var getDirector = function (req, res) {
    return _directorService.getDirector().then(function (r) {
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

var getDirectorById = function (req, res) {

    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }
    return _directorService.getDirectorById(req.params.id).then(function (r) {
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

var createDirector = function (req, res) {
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

    _directorService.getDirectorByName(req.body.name).then(function (r) {
        if (r !== null) {
            res.status(500);
            res.json("Director with this name already exists.");
            return res;
        }
        else {
            return _directorService.createDirector(req.body.name, req.body.age, req.body.gender).then(function (r) {
                res.sendStatus(201); // created
                return res;
            });
        }
    });
}

var updateDirector = function (req, res) {

    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }

    _directorService.getDirectorById(req.params.id).then(function (r) {
        if (r == null) {
            res.status(404);
            res.json("Director with the given id doesnot exists.");
            return res;
        }
        else {
            return _directorService.updateDirector(req.params.id, req.body).then(function (r) {
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


var removeDirector = function (req, res) {

    if (req.params.id < 1 || req.params.id == null) {
        res.status(500);
        res.json("Please provide a valid Id.");
        return res;
    }

    _directorService.getDirectorById(req.params.id).then(function (r) {
        if (r == null) {
            res.status(404);
            res.json("Director with the given id doesnot exists.");
            return res;
        }
        else {
            return _directorService.removeDirector(req.params.id).then(function (err, r) {
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
    getDirector: getDirector,
    getDirectorById: getDirectorById,
    createDirector: createDirector,
    updateDirector: updateDirector,
    removeDirector: removeDirector
};