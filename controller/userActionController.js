const UserModel = require('../model/userModel.js');
const ImagesModel = require('../model/imagesModel.js');
const VideosModel = require('../model/videosModel.js');
const ApplicationsModel = require('../model/applicaitonsModel.js');
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

        const fileName = `${randomSevenDigitGen()}+`+file.originalname;
        console.log('FileName', fileName)

        const fileBucket = bucket.file(fileName)

        const fileUpload = await fileBucket.save(file.buffer)

        console.log("fileUpload in fileUplaod handler", fileUpload);

        if (file.mimetype.split('/')[0] === 'image') {
            console.log("In teh image type")
            // const updatedImages = [...user.images, fileName]
            // user.images = updatedImages;
            const userImages = await ImagesModel.findOne({userId: id});
            console.log("[userImages]", userImages );
            if (!userImages) {
                const images =[fileName]
                const newUserImages = new ImagesModel({
                    userId: id,
                    images: images
                })

                return newUserImages.save().then((result) => {
                    res.status(201).json({
                        uploaded: true
                    })
                })
            }
            const updatedImages = [...userImages.images, fileName];
            userImages.images = updatedImages;
            console.log("before return in images type")
            return userImages.save().then((result) => {
                res.status(201).json({
                    uploaded: true
                })
            })
        }
        else if (file.mimetype.split('/')[0] === 'video') {
            // console.log("In teh video type")
            // const updatedVideos = [...user.videos, fileName];
            // user.videos = updatedVideos;

            const userVideos = await VideosModel.find({userId: id});
            if (!userVideos) {
                const videos =[fileName]
                const newUserVideos = new ImagesModel({
                    userId: id,
                    videos: videos
                })

                return newUserVideos.save().then((result) => {
                    res.status(201).json({
                        uploaded: true
                    })
                })
            }
            const updatedVideos = [...userVideos.videos, fileName];
            userVideos.videos = updatedVideos;
            return userVideos.save().then((result) => {
                res.status(201).json({
                    uploaded: true
                })
            })
        }
        else if (file.mimetype.split('/')[0] === 'application') {
            // console.log("In teh app type")
            // const updatedApplications = [...user.applications, fileName]
            // user.applications = updatedApplications;
            console.log("mimetype == applications")

            const userApps = await ApplicationsModel.findOne({userId: id});
            if (!userApps) {
                const apps = [fileName]
                const newUserApps = new ApplicationsModel({
                    userId: id,
                    applications: apps
                })

                return newUserApps.save().then((result) => {
                    res.status(201).json({
                        uploaded: true
                    })
                })
            }
            const updatedApps = [...userApps.applications, fileName];
            userApps.applications = updatedApps;
            return userApps.save().then((result) => {
                res.status(201).json({
                    uploaded: true
                })
            })
        }
        else {

            // const updatedOthers = [...user.others, fileName];
            // user.others = updatedOthers;
            console.log("mimetype === others");
            const userOthers = await OthersModel.findOne({userId: id});
            if (!userOthers) {
                const updatedOthers =[fileName]
                const newUserOthers = new OthersModel({
                    userId: id,
                    others: updatedOthers
                })

                return newUserOthers.save().then((result) => {
                    res.status(201).json({
                        uploaded: true
                    })
                })
            }

            const updatedOthers = [...userOthers, fileName];
            userOthers.others = updatedOthers;
            return userOthers.save().then(result => {
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