var changeCase = require('change-case');
var express = require('express');
var routes = require('require-dir')();
var config = require('nconf');
var User = require('../models/api_user'); // get our mongoose model
var swaggerJSDoc = require('swagger-jsdoc');
var cors = require('cors');

// =======================
// swagger api documentation ================
// =======================

var bearerDefinition = {
            type: 'apiKey',
            name: 'Authorization',
            in: 'Header'
        }

var swaggerDefinition = {
    info: {
        title: 'Movies Project',
        version: '1.0.0',
        description: 'APIs exposed for the Platform : Movies Project',
    },
    host: config.get('app:domain') + ':' + config.get('NODE_PORT'),
    basePath: '/'
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./app/specs/*.js'],
};
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

swaggerSpec.securityDefinitions["jsonWebToken"] = bearerDefinition;

// =======================
// swagger api documentation ================
// =======================

module.exports = function(app) {
    'use strict';

    app.use(cors({ origin: '*' }));
    // Add headers
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });

    // =======================
    // routes ================
    // =======================
    // basic route

      app.get('/', function (req, res) {
          res.send('Hello! The API is at http://localhost:' + config.get('NODE_PORT') + '/api');
      });

      app.get('/setup', function (req, res) {

          // create a sample user
          var nick = new User({
              name: config.get('api:username'),
              password: config.get('api:password'),
              admin: true
          });

          // save the sample user
          nick.save(function (err) {
              if (err) throw err;

              console.log('User saved successfully');
              res.json({ success: true });
          });
      });

    // Initialize all routes

    // API ROUTES -------------------

    // get an instance of the router for api routes
      var apiRoutes = express.Router();

    //List your routes over here
    //1. authentication
    require('./auth.js')(apiRoutes);

    //2. movie
    require('./movie.js')(apiRoutes);

    //3. actor
    require('./actor.js')(apiRoutes);

    //4. director
    require('./director.js')(apiRoutes);

    //5. associations
    require('./associations.js')(apiRoutes);


    // route to show a random message (GET http://localhost:4000/api/)

    apiRoutes.get('/', function (req, res) {
        res.json({ message: 'Welcome to the coolest API on earth!' });
    });

    // serve swagger
    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    // apply the routes to our application with the prefix /api
    app.use('/api', apiRoutes);

    // Error handler
    app.use(function (err, req, res, next) {

        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: (app.get('env') === 'development' ? err : {})
        });
        next(err);
    });

};

