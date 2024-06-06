// Purpose: API routes for the application
// Notes: This file is used to collect all of the API routes and package them up for the server to use. The index.js file is used to gather up the individual API routes and package them up as a single API object. This file is then imported into the server.js file and used as the single point of access for all API routes. This is done to help with code organization and to make it easier to maintain the application.
const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);

module.exports = router;

