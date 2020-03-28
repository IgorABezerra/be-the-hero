const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Routes de Session
 */
routes.post('/session', SessionController.create);

/**
 * Routes de Profile
 */
routes.get('/profile', ProfileController.index);

/**
 * Routes de ONGS 
 */
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

/**
 * Routes de Incidents
 */
routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', IncidentsController.create);
routes.delete('/incidents/:id', IncidentsController.delete);

module.exports = routes;