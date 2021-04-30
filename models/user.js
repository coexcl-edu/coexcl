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
	personalInfo :
    {
                fatherName: {
                type: String,
                required: true
            },
            motherName: {
                type: String,
                required: true
            },
            bloodGroup: {
                type: String,
                required: true
            },
            hobby: {
                type: String,
                required: true
            },
            favouriteSport: {
                type: String,
                required: true
            }
		
	},
    academics :
    {
            schoolName: {
                type: String,
                required: true
            },
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
                required: true
            }
		
	}

})

module.exports = mongoose.model('User',userSchema)