const { Timestamp } = require('bson');
const mongoose = require('mongoose')


const liveClassSchema = new mongoose.Schema({

    schoolCode: {
        type: Number,
        required: true
    },
    class : {
        type: Number,
        required: true
    },
    subject :{
        type: String,
        required: true
    },
    topic : {
        type: String,
        required: true
    },
    teacherName : {
        type: String,
        required: true
    },
    startTime :
    {
        type: Number,
        required: false
    },
    duration :{
        type: Number,
        required: true
    },
    description :{
        type : String,
        required : true
    },
    videoMeetUrl : {
        type: String,
        required: true
    }


});

module.exports = mongoose.model('LiveClass',liveClassSchema)