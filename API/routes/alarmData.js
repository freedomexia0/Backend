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


//create one
router.post('/create', async(req,res) => {
    let findName
    
    const Data = new alarmData({
        Id: req.body.Id,
        Alarmlevel: req.body.Alarmlevel,
        AlarmId: req.body.AlarmId,
        AlarmTime: req.body.AlarmTime,
        Alarmmessage: req.body.Alarmmessage,
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
async function getNameData(req, res, next){
    console.log(req.params.artName)
    let nameData
    try {
        nameData = await personData.findOne({artName: req.params.artName})
            if(nameData == null){
                return res.status(404).json({message: 'Cannot find data!'})
            }
        
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.nameData = nameData
    next()
}



module.exports = router