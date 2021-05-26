const mongoose = require('mongoose')


const noticeSchema = new mongoose.Schema({

   
    schoolId: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    notice :{
        type: String,
        required: true
    },
    header :{
        type: String,
        required: true
    },
    date :{
        type: Date,
        required: true
    },

}
)

module.exports = mongoose.model('Notice',noticeSchema)