const mongoose = require('mongoose')


const videoSchema = new mongoose.Schema({

    subject: {
        type: String,
        required: true
    },
    class: {
        type: Number,
        required: true
    },
    chaptername: {
        type: String,
        required: true
    },
    board: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Video',videoSchema)