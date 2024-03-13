
const ImagesModel = require('../model/imagesModel.js');
const VideosModel =  require('../model/videosModel.js');
const ApplicationsModel = require('../model/applicaitonsModel.js');
const othersModel = require('../model/othersModel.js');

exports.dashboardFetchHandler = async (req, res, next) => {
    try {
        const { id } = req.body;
        const images = await ImagesModel.find({userId: id}).sort({createdAt: -1}).limit(10);
        console.log("[Images]:", images);
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