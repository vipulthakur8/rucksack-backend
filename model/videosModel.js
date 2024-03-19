
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const videosModel = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    videoName: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

module.exports = mongoose.model('videos', videosModel)