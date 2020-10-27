const express = require('express')
const { findOne } = require('../models/alarmData')
const router = express.Router()
const alarmData = require('../models/alarmData')
const alarmLogData = require('../models/alarmLogData')

//get all
router.get('/',async (req, res) => {
    try {
        const alarmDatas = await alarmData.find()
        res.json(alarmDatas)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})
//get all log
router.get('/alarmlog',async (req, res) => {
    try {
        const alarmLogDatas = await alarmLogData.find()
        res.json(alarmLogDatas)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

//get one by id
router.get('/id/:id',getData,(req,res) => {
    res.json(res.Data)
    
})
router.get('/alarmId/:AlarmId',getAlarmData,(req,res) => {
    res.json(res.AlarmData)
    
})

router.get('/alarmIdlog/:AlarmId',getLogAlarmData,(req,res) => {
    res.json(res.logAlarmData)
    
})

router.patch('/updatelog/:AlarmId',getLogAlarmData,async(req,res) =>{
    var myDate = new Date();

    if(req.body.AlarmDefinition != null){
        res.AlarmData.AlarmDefinition = req.body.AlarmDefinition
    }
    if(req.body.AlarmTrigger != null){
        res.AlarmData.AlarmTrigger = req.body.AlarmTrigger
    }
    if(req.body.Alarmlevel != null){
        res.AlarmData.Alarmlevel = req.body.Alarmlevel
    }
    if(req.body.AlarmMax != null){
        res.AlarmData.AlarmMax = req.body.AlarmMax
    }
    if(req.body.AlarmMin != null){
        res.AlarmData.AlarmMin = req.body.AlarmMin
    }
    if(req.body.AlarmId != null){
        res.AlarmData.AlarmId = req.body.AlarmId
    }
    if(req.body.AlarmTime != null){
        res.AlarmData.AlarmTime = req.body.AlarmTime
    }
    if(req.body.AlarmMessage != null){
        res.AlarmData.AlarmMessage = req.body.AlarmMessage
    }
    if(req.body.NormalizationMessage != null){
        res.AlarmData.NormalizationMessage = req.body.NormalizationMessage
    }
    if(req.body.NormalizationTime != null){
        res.AlarmData.NormalizationTime = req.body.NormalizationTime
    }
    if(req.body.AckUser != null){
        res.AlarmData.AckUser = req.body.AckUser
       // res.alarmLogData.AckUser = req.body.AckUser
    }
    if((req.body.TriggerStatus == 1)&&(res.AlarmData.AlarmTime == null)){
        res.AlarmData.TriggerStatus = req.body.TriggerStatus
        res.AlarmData.AlarmTime = myDate.toLocaleDateString()+" "+ myDate.toLocaleTimeString()
        res.alarmLogData.AlarmTime = myDate.toLocaleDateString()+" "+ myDate.toLocaleTimeString()
    }
    if(req.body.TriggerMode != null){ 
        res.AlarmData.TriggerMode = req.body.TriggerMode
    }

    if(req.body.TriggerValue != null){
        res.AlarmData.TriggerValue = req.body.TriggerValue
    }


    try {
       // const updateLogData = await res.alarmLogData.save()
        const updateData = await res.AlarmData.save()
        res.json(updateData+updateLogData)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

    



})



//update
router.patch('/update/:AlarmId',getAlarmData,async(req,res) =>{
    var myDate = new Date();

    var logAlarmData = await alarmLogData.findOne({AlarmId: res.AlarmData.AlarmId})
    console.log(res.AlarmData.AlarmId)

    if(req.body.AlarmDefinition != null){
        res.AlarmData.AlarmDefinition = req.body.AlarmDefinition
        logAlarmData.AlarmDefinition = req.body.AlarmDefinition
    }
    if(req.body.AlarmTrigger != null){
        res.AlarmData.AlarmTrigger = req.body.AlarmTrigger
        logAlarmData.AlarmTrigger = req.body.AlarmTrigger
    }
    if(req.body.Alarmlevel != null){
        res.AlarmData.Alarmlevel = req.body.Alarmlevel
        logAlarmData.Alarmlevel = req.body.Alarmlevel
    }
    if(req.body.AlarmMax != null){
        res.AlarmData.AlarmMax = req.body.AlarmMax
        logAlarmData.AlarmMax = req.body.AlarmMax
    }
    if(req.body.AlarmMin != null){
        res.AlarmData.AlarmMin = req.body.AlarmMin
        logAlarmData.AlarmMin = req.body.AlarmMin
    }
    if(req.body.AlarmId != null){
        res.AlarmData.AlarmId = req.body.AlarmId
    }
    if(req.body.AlarmTime != null){
        res.AlarmData.AlarmTime = req.body.AlarmTime
    }
    if(req.body.AlarmMessage != null){
        res.AlarmData.AlarmMessage = req.body.AlarmMessage
    }
    if(req.body.NormalizationMessage != null){
        res.AlarmData.NormalizationMessage = req.body.NormalizationMessage
    }
    if(req.body.NormalizationTime != null){
        res.AlarmData.NormalizationTime = req.body.NormalizationTime
    }
    if(req.body.AckUser != null){
        res.AlarmData.AckUser = req.body.AckUser
        logAlarmData.AckUser = req.body.AckUser
    }
    if((req.body.TriggerStatus == 1)&&(res.AlarmData.AlarmTime == null)){
        res.AlarmData.TriggerStatus = req.body.TriggerStatus
        res.AlarmData.AlarmTime = myDate.toLocaleDateString()+" "+ myDate.toLocaleTimeString()
        logAlarmData.AlarmTime = myDate.toLocaleDateString()+" "+ myDate.toLocaleTimeString()
    }
    if((req.body.TriggerStatus == 0)&&(res.AlarmData.AlarmTime != null)&&((res.AlarmData.NormalizationTime == null))){
        res.AlarmData.TriggerStatus = req.body.TriggerStatus
        res.AlarmData.NormalizationTime = myDate.toLocaleDateString()+" "+ myDate.toLocaleTimeString()
        logAlarmData.NormalizationTime = myDate.toLocaleDateString()+" "+ myDate.toLocaleTimeString()
    }

    if(req.body.TriggerMode != null){ 
        res.AlarmData.TriggerMode = req.body.TriggerMode
    }

    if(req.body.TriggerValue != null){
        res.AlarmData.TriggerValue = req.body.TriggerValue
        logAlarmData.TriggerValue = req.body.TriggerValue
    }
 


    try {
       const updateLogData = await logAlarmData.save()
       if( res.AlarmData.AckUser == null){
        const updateData = await res.AlarmData.save()
       }else{
        const updateData = await res.AlarmData.remove()
       }
       
        res.json(updateLogData)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

    



})



//create one
router.post('/create', async(req,res) => {
    let findAlarm = await alarmLogData.find();
    let UniqueId = 0;
    if(findAlarm!=null){
        for(let i = 0; i< findAlarm.length+1;i++){
       
            let findId = await alarmLogData.findOne({AlarmId: i})
           
            if(findId==null){
                UniqueId = i;
                break;
            }
        }
        
    }
   

    const Data = new alarmData({
        Alarmlevel: req.body.Alarmlevel,
        AlarmDefinition: req.body.AlarmDefinition,
        AlarmTrigger: req.body.AlarmTrigger,
        AlarmMax: req.body.AlarmMax,
        AlarmMin: req.body.AlarmMin, 
        AlarmId: UniqueId,
        AlarmTime: req.body.AlarmTime,
        AlarmMessage: req.body.AlarmMessage,
        NormalizationMessage: req.body.NormalizationMessage,
        NormalizationTime: req.body.NormalizationTime,
        TriggerStatus: 0,
        TriggerMode: req.body.TriggerMode

    })

    const LogData = new alarmLogData({
        Alarmlevel: req.body.Alarmlevel,
        AlarmDefinition: req.body.AlarmDefinition,
        AlarmTrigger: req.body.AlarmTrigger,
        AlarmMax: req.body.AlarmMax,
        AlarmMin: req.body.AlarmMin, 
        AlarmId: UniqueId,
        AlarmTime: req.body.AlarmTime,
        AlarmMessage: req.body.AlarmMessage,
        NormalizationMessage: req.body.NormalizationMessage,
        NormalizationTime: req.body.NormalizationTime,
        TriggerStatus: 0,
        TriggerMode: req.body.TriggerMode

    })
    try {
            const newData = await Data.save()
            const newLogData = await LogData.save()
            res.status(201).json(newLogData)

    } catch (err) {
        res.status(400)
    }
})


//deleting one
router.delete('/:id',getData,async (req,res) => {
    try {
        await res.Data.remove()
        res.json({message:'Delete success'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    
})


//deleting by alarm id
router.delete('/alarmId/:AlarmId',getLogAlarmData,async (req,res) => {

    var userAlarmData = await alarmData.findOne({AlarmId: res.logAlarmData.AlarmId})


    try {
        if(userAlarmData != null){
          await   userAlarmData.remove()
        }
        await res.logAlarmData.remove()
        res.json({message:'Delete success'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    
})


//function for finding data by ID
async function getData(req, res, next){
    let Data
    try {
        Data = await alarmData.findById(req.params.id)
            if(Data == null){
                return res.status(404).json({message: 'Cannot find data!'})
            }
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.Data = Data
    next()
}

//function for finding data by id
async function getAlarmData(req, res, next){
    let AlarmData
    try {
        AlarmData = await alarmData.findOne({AlarmTrigger: req.params.AlarmTrigger})
            if(AlarmData == null){
                return res.status(404).json({message: 'Cannot find alarm data!'})
            }
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.AlarmData = AlarmData
    next()
}

//function for finding data by id
async function getLogAlarmData(req, res, next){
    let logAlarmData
    try {
        logAlarmData = await alarmLogData.findOne({AlarmId: req.params.AlarmId})
            if(logAlarmData == null){
                return res.status(404).json({message: 'Cannot find data!'})
            }
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.logAlarmData = logAlarmData
    next()
}



module.exports = router