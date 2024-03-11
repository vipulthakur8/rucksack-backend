
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
    
})

module.exports = mongoose.model('others', othersModel)