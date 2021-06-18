const mongoose = require('mongoose')


const funFactSchema = new mongoose.Schema({

   
    fileUrl: {
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

module.exports = mongoose.model('FunFact',funFactSchema)