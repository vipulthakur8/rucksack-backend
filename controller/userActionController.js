const UserModel = require('../model/userModel.js');

require('dotenv').config()

const { Storage } = require('@google-cloud/storage')

const storage = new Storage({
    keyFilename: `${process.env.KEY_FILE}`
})

const bucketName = `${process.env.STORAGE_BUCKET}`
const bucket = storage.bucket(bucketName)


exports.fileUpload = async (req, res, next) => {
    try {
        console.log("fileUpload", req.body);
        if (!req.file) {
            const error = new Error('No file is attached')
            error.status = 400;
            throw error;
        }

        // const fileType = req.body.fileType;
        const file = req.file;
        console.log("[file]", file);

        if ( file.size >= 100*1024*1024 ) {
            const error = new Error('Only files upto 100 Mb is allowed')
            error.status = 400;
            throw error;
        }

        const fileBucket = bucket.file(file.originalname)

        const fileUpload = await fileBucket.save(file.buffer)

        console.log("fileUpload in fileUplaod handler", fileUpload);

        return res.status(201).json({
            uploaded: true
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 501;
        }
        next(error);
    }
}