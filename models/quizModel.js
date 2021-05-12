const mongoose = require('mongoose')


const quizSchema = new mongoose.Schema({

    schoolcode: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
	options  :
    {
                A: {
                type: String,
                required: true
            },
                B: {
                type: String,
                required: true
            },
                C: {
                type: String,
                required: true
            },
                D: {
                type: String,
                required: true
            }
	},
    answer :
    {
        type: String,
        required: true
	}

})

module.exports = mongoose.model('Quiz',quizSchema)