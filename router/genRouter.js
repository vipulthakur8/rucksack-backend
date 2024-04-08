const express = require('express');

const router = express.Router();

const generalController = require('../controller/generalController.js');
// const multerUpload = require('../middleware/multerSetup.js')

router.post('/dashboardContent', generalController.dashboardFetchHandler);

router.get('/images/:userId/:image', generalController.serveImageHandler);

router.get('/document/:pdfName', generalController.pdfReadHandler)

router.get('/videos/:videoName', generalController.videoStreamHandler)

router.get('/fetch-all-images', generalController.fetchAllImageHandler);

module.exports = router;