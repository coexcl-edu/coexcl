const mongoose = require('mongoose')


const notesSchema = new mongoose.Schema({

   
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}
)

module.exports = mongoose.model('Note',notesSchema)