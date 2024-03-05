const express = require('express');

const router = express.Router();

const userActionController = require('../controller/userActionController.js');
const multerUpload = require('../middleware/multerSetup.js')

router.post('/upload', multerUpload.single('file'), userActionController.fileUpload);

module.exports = router;