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
                fatherName: {
                    type: String,
                    required: false
                },
                motherName: {
                    type: String,
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
                    required: true
                },
                rollNo: {
                    type: Number,
                    required: true
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
                }
            }

})

module.exports = mongoose.model('User',userSchema)