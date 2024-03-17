const express = require('express');

const router = express.Router();

const generalController = require('../controller/generalController.js');
// const multerUpload = require('../middleware/multerSetup.js')

router.post('/dashboardContent', generalController.dashboardFetchHandler);

router.get('/images/:userId/:image', generalController.serveImageHandler);

module.exports = router;