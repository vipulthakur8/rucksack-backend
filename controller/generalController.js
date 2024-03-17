
const ImagesModel = require('../model/imagesModel.js');
const VideosModel =  require('../model/videosModel.js');
const ApplicationsModel = require('../model/applicaitonsModel.js');
const othersModel = require('../model/othersModel.js');
const { Storage } = require('@google-cloud/storage')

require('dotenv').config()
const storage = new Storage({
    keyFilename: `${process.env.KEY_FILE}`
})

exports.dashboardFetchHandler = async (req, res, next) => {
    try {
        const { id } = req.body;
        const images = await ImagesModel.find({userId: id}).sort({createdAt: -1}).limit(10);
        // console.log("[Images]:", images);
        return res.status(200).json({
            images
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 501;
        }
        next(error);
    }
}

exports.serveImageHandler = async(req, res, next) => {
    console.log('[serveImageHandler]', req.params)
    const imageName = req.params.image;
    const userId = req.params.userId;
    console.log('[serveImageHandler]', imageName, userId);
    const bucketName = process.env.STORAGE_BUCKET;
    try {
        console.log('before')
        const file = storage.bucket(bucketName).file(imageName);
        console.log('after file', file);

        res.setHeader('Content-Type', 'image/jpeg');

        return file.createReadStream().on('error', err => {
            if (err.code === 404) {
                res.status(404).send('Image not found');
            }
            else {
                console.error('Error streaming image:', err);
                res.status(500).send('Internal Server Error');
            }

        }).pipe(res);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 501;
        }
        next(error);
    }
}


exports.serveVideoHandler = async(req, res, next) => {

    console.log('[serveImageHandler]', req.params)
    const videoName = req.params.image;
    const userId = req.params.userId;
    console.log('[serveImageHandler]', videoName, userId);
    const bucketName = process.env.STORAGE_BUCKET;
     
    try {
        // console.log('before')
        const file = storage.bucket(bucketName).file(videoName);
        // console.log('after file', file);

        // res.setHeader('Content-Type', 'video/');

        return file.createReadStream().on('error', err => {
            if (err.code === 404) {
                res.status(404).send('Image not found');
            }
            else {
                console.error('Error streaming image:', err);
                res.status(500).send('Internal Server Error');
            }

        }).pipe(res);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 501;
        }
        next(error);
    }
}