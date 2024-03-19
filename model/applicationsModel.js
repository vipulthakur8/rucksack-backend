
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const applicationsModel = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    appName: {
        type: String,
        required: true
    }
    
}, {timestamps: true})

module.exports = mongoose.model('applications', applicationsModel)