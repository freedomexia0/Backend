const mongoose = require('mongoose')

const userPasswordDataSchema = new mongoose.Schema({
    password:{
        type: String,
        required: true
    },
    email:{
        type: String

    },
    personID:{
        type: String,
        required: true
    },
    admin:{
        type: Boolean
    }
})

module.exports = mongoose.model('userPasswordData',userPasswordDataSchema)