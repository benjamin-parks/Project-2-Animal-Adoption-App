// Purpose: Index file for the controllers folder. This file will be used to export all of the routes in the controllers folder.
// Notes: This file is used to collect all of the routes in the controllers folder and package them up as a single object. This file is then imported into the server.js file and used as the single point of access for all routes. This is done to help with code organization and to make it easier to maintain the application.
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const petRoutes = require('./api/petRoutes');

router.use('/users', homeRoutes);
router.use('/api', apiRoutes);
router.use('/', petRoutes);

module.exports = router;