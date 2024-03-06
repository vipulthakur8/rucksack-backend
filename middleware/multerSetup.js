
const multer = require('multer');

exports.upload = multer({
    storage: multer.memoryStorage,
    limits: {
        fileSize: 50*1024*1024      // 50MB size of file is allowed
    }
})

// module.exports = upload;