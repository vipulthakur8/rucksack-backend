
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userModel = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // images: {
    //     type: Array
    // },
    // videos: {
    //     type: Array
    // },
    // applications: {
    //     type: Array
    // },
    // others: {
    //     type: Array
    // }
    
})

module.exports = mongoose.model('user', userModel)