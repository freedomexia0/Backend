const mongoose = require('mongoose')

const alarmLogDataSchema = new mongoose.Schema({

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
    },
    TriggerMode: {
        type:Number
    },
    TriggerValue: {
        type:Number
    }

})

module.exports = mongoose.model('alarmLogData',alarmLogDataSchema)