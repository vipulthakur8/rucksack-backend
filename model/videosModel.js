
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const videosModel = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    videos: {
        type: Array
    }
    
})

module.exports = mongoose.model('videos', videosModel)