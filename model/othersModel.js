
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const othersModel = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    otherName: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

module.exports = mongoose.model('others', othersModel)