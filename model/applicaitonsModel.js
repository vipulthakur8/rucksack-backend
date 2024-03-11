
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const applicationsModel = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    applications: {
        type: Array
    }
    
})

module.exports = mongoose.model('applications', applicationsModel)