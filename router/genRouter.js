const express = require('express');

const router = express.Router();

const generalController = require('../controller/generalController.js');
// const multerUpload = require('../middleware/multerSetup.js')

router.post('/dashboardContent', generalController.dashboardFetchHandler);

module.exports = router;