var mongoose = require('mongoose');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('nconf'); // get our config file
var User = require('../models/api_user'); // get our mongoose model
var _authenticationService = require('../authentication/token_authentication.js');

module.exports = function (apiRoutes) {
    'use strict';
    apiRoutes.post('/authenticate', function (req, res) {
        _authenticationService.authenticateUser(req, res);
    });

    // TODO: route middleware to verify a token

    apiRoutes.use(function (req, res, next) {

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, config.get('jwt:secret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    });

    // route to return all users. It can be used to identify if the App User is from mobile or portal
    apiRoutes.get('/apiusers', function (req, res) {
        _authenticationService.getApiUser(req, res);
    });
};
