const mongoose = require('mongoose')


const loginSchema = new mongoose.Schema({

   
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Login',loginSchema)