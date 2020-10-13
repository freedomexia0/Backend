const mongoose = require('mongoose')

const alarmDataSchema = new mongoose.Schema({

    Id:{
        type:String
    },
    Alarmlevel:{
        type:Number
    },
    AlarmId:{
        type:String
    },
    AlarmTime:{
        type:String
    },
    Alarmmessage:{
        type:String
    },
    NormalizationTime:{
        type:String
    }

})

module.exports = mongoose.model('alarmData',alarmDataSchema)