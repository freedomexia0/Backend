const express = require('express')
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


//update
router.patch('/update/:AlarmId',getAlarmData,async(req,res) =>{
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
    }
    if(req.body.TriggerStatus == 1){
        res.AlarmData.TriggerStatus = req.body.TriggerStatus
        res.AlarmData.AlarmTime = myDate.toLocaleDateString()+" "+ myDate.toLocaleTimeString()
    }

    try {
        const updateData = await res.AlarmData.save()
        res.json(updateData)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

    



})



//create one
router.post('/create', async(req,res) => {
    let findAlarm = await alarmData.find();
    let UniqueId = 0;
    console.log(findAlarm)
    if(findAlarm!=null){
        for(let i = 0; i< findAlarm.length+1;i++){
       
            let findId = await alarmData.findOne({AlarmId: i})
           
            if(findId==null){
                UniqueId = i;
                console.log(UniqueId)
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
        TriggerStatus: 0

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
        TriggerStatus: 0

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
router.delete('/alarmId/:AlarmId',getAlarmData,async (req,res) => {
    try {
        await res.AlarmData.remove()
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

//function for finding data by artName
async function getAlarmData(req, res, next){
    console.log(req.params.AlarmId)
    let AlarmData
    try {
        AlarmData = await alarmData.findOne({AlarmId: req.params.AlarmId})
            if(AlarmData == null){
                console.log(AlarmData)
                return res.status(404).json({message: 'Cannot find data!'})
            }
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.AlarmData = AlarmData
    next()
}



module.exports = router