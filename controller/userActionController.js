const UserModel = require('../model/userModel.js');
const ImagesModel = require('../model/imagesModel.js');
const VideosModel = require('../model/videosModel.js');
const ApplicationsModel = require('../model/applicationsModel.js');
const OthersModel = require('../model/othersModel.js')
const randomSevenDigitGen = require('../middleware/randomSevenDigitGen.js')
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

        const { id } = req.body;
        const user = await UserModel.find({_id: id})
        console.log('[USer]', user);
        if(!user) {
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }

        // const fileName = `${randomSevenDigitGen()}+`+file.originalname.replace(/ /gi, '');
        const fileName = `${randomSevenDigitGen()}`
        console.log('FileName', fileName)

        const fileBucket = bucket.file(fileName)

        const fileUpload = await fileBucket.save(file.buffer)

        console.log("fileUpload in fileUplaod handler", fileUpload);

        if (file.mimetype.split('/')[0] === 'image') {
            console.log("In the image type")
            const newUserImages = new ImagesModel({
                userId: id,
                image: fileName
            })

            return newUserImages.save().then((result) => {
                res.status(201).json({
                    uploaded: true
                })
            })
        }
        else if (file.mimetype.split('/')[0] === 'video') {
            console.log("In the video type")
            const newUserVideos = new VideosModel({
                userId: id,
                videoName: fileName
            })

            return newUserVideos.save().then((result) => {
                res.status(201).json({
                    uploaded: true
                })
            })

        }
        else if (file.mimetype.split('/')[0] === 'application') {
            console.log("I am inside applications mimetyhpe in file upload")
            const newUserApps = new ApplicationsModel({
                userId: id,
                appName: fileName
            })

            return newUserApps.save().then((result) => {
                res.status(201).json({
                    uploaded: true
                })
            })

        }
        else {
            console.log("I am inside others mimetyhpe in file upload")
            const newUserOthers = new OthersModel({
                userId: id,
                otherName: fileName
            })

            return newUserOthers.save().then((result) => {
                res.status(201).json({
                    uploaded: true
                })
            })

        }


    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 501;
        }
        next(error);
    }
}