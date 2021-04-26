const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    schoolname: {
        type: String,
        required: true
    },
    subscribed: {
        type: Boolean,
        required: true,
        default: false
    }

})

module.exports = mongoose.model('User',userSchema)