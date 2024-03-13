
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const othersModel = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    others: {
        type: Array
    }
    
}, {timestamps: true})

module.exports = mongoose.model('others', othersModel)