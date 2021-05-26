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
    userid : {
        type: String,
        required: true
    },
    subscribed: {
        type: Boolean,
        required: true,
        default: false
    },
    email: {
        type: String,
        required: false
    },
	personalInfo :
            {
                gender: {
                    type: String,
                    required: false
                },
                fatherName: {
                    type: String,
                    required: false
                },
                motherName: {
                    type: String,
                    required: false
                },
                parentContact: {
                    type: Number,
                    required: false
                },
                bloodGroup: {
                    type: String,
                    required: false
                },
                hobby: {
                    type: String,
                    required: false
                },
                favouriteSport: {
                    type: String,
                    required: false
                }
	        },
    academics :
            {
                class: {
                    type: String,
                    required: false
                },
                rollNo: {
                    type: Number,
                    required: false
                },
                favouriteSubject: {
                    type: String,
                    required: false
                }	
	        },
    schoolInfo :
            {
                schoolName: {
                    type: String,
                    required: false
                },
                schoolCode: {
                    type: Number,
                    required: false
                },
                city: {
                    type : String,
                    required : false
                },
                state: {
                    type : String,
                    required : false
                },
                logourl : {
                    type : String,
                    required : false
                }
            },
    quizInfo :
            {
                lastattempted : {
                    type: Date,
                    required: false
                },
                percent :
                {
                    type : Number,
                    required : false
                }
            }
        

})

module.exports = mongoose.model('User',userSchema)