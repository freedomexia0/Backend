const mongoose = require('mongoose')

const alarmDataSchema = new mongoose.Schema({

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
        type:Number
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
    },
    AckUser: {
        type:String
    },
    TriggerStatus: {
        type:Number
    }

})

module.exports = mongoose.model('alarmData',alarmDataSchema)