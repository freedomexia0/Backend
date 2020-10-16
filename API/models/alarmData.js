const mongoose = require('mongoose')

const alarmDataSchema = new mongoose.Schema({

    userId:{
        type:String
    },
    AlarmDefinition: {
        type:String
    },
    AlarmTrigger:{
        type:String
    },
    Alarmlevel:{
        type:Number
    },
    AlarmMax:{
        type:Number
    },
    AlarmMin:{
        type:Number
    },
    AlarmId:{
        type:String
    },
    AlarmTime:{
        type:String
    },
    AlarmMessage:{
        type:String
    },
    NormalizationMessage:{
        type:String
    },
    NormalizationTime:{
        type:String
    }

})

module.exports = mongoose.model('alarmData',alarmDataSchema)