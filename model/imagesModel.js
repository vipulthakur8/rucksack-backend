
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const imagesModel = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    image: {
        type: String,
        required: true
    },

    
}, {timestamps:true})

module.exports = mongoose.model('images', imagesModel)