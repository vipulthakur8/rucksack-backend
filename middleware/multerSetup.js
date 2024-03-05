
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage,
    limits: {
        fileSize: 100*1024*1024      // 50MB size of file is allowed
    }
})

module.exports = upload;