const UserModel = require('../model/userModel.js');

exports.fileUpload = async (req, res, next) => {
    try {
        console.log("fileUpload", req);
        if (!req.file) {
            const error = new Error('No file is attached')
            error.status = 400;
            throw error;
        }

        // const fileType = req.body.fileType;
        const file = req.file;
        console.log("[file]", file);

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