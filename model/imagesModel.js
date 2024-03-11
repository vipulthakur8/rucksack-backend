
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const imagesModel = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    images: {
        type: Array
    }
    
})

module.exports = mongoose.model('images', imagesModel)