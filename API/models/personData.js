const mongoose = require('mongoose')

const personDataSchema = new mongoose.Schema({

    artName:{
        type: String,
        required: true,
    },
    age:{
        type: String,
    },
    email:{
        type: String,
    },
    musicGenre:{
        type: String,
    },
    songList:{
        type: String
    },
    googleUid:{
        type: String
    }

})

module.exports = mongoose.model('personData',personDataSchema)