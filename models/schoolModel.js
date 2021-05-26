const mongoose = require('mongoose')


const schoolSchema = new mongoose.Schema({

   
    schoolcode: {
        type: String,
        required: true
    },
    schoolname: {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    logourl :{
        type: String,
        required: false
    }

}
)

module.exports = mongoose.model('School',schoolSchema)