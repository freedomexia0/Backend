const express = require('express')
const router = express.Router()
const alarmData = require('../models/alarmData')

//get all
router.get('/',async (req, res) => {
    try {
        const alarmDatas = await alarmData.find()
        res.json(alarmDatas)
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


//create one
router.post('/create', async(req,res) => {
    let findName
    
    const Data = new alarmData({
        userId: req.body.userId,
        Alarmlevel: req.body.Alarmlevel,
        AlarmDefinition: req.body.AlarmDefinition,
        AlarmTrigger: req.body.AlarmTrigger,
        AlarmMax: req.body.AlarmMax,
        AlarmMin: req.body.AlarmMin, 
        AlarmId: req.body.AlarmId,
        AlarmTime: req.body.AlarmTime,
        AlarmMessage: req.body.AlarmMessage,
        NormalizationMessage: req.body.NormalizationMessage,
        NormalizationTime: req.body.NormalizationTime

    })
    try {
            const newData = await Data.save()
            res.status(201).json(newData)

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