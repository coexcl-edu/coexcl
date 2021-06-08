const mongoose = require('mongoose')


const noticeSchema = new mongoose.Schema({

   
    schoolId: {
        type: String,
        required: true
    },
    class: {
        type: Number,
        required: true
    },
    notice :{
        type: String,
        required: true
    },
    title :{
        type: String,
        required: true
    },
    date :{
        type: Date,
        required: true
    },
    imageurl :{
        type: String,
        required: false
    },
    videourl :{
        type: String,
        required: false
    }

}
)

module.exports = mongoose.model('Notice',noticeSchema)