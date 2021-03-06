const express = require('express')
const router = express.Router()
const personData = require('../models/personData')
const userPasswordData = require('../models/userPasswordData')

//get all
router.get('/',async (req, res) => {
    try {
        const personDatas = await personData.find()
        res.json(personDatas)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

//get one by id
router.get('/id/:id',getData,(req,res) => {
    res.json(res.Data)
    
})

//get one 
router.get('/userName/:userName',getNameData,(req,res) => {
    res.json(res.nameData)    
})

//create one
router.post('/create', async(req,res) => {
    let findName
    
    const Data = new personData({
        AnlageName: req.body.AnlageName,
        Id: req.body.Id,
        Controller: req.body.Controller

    })
    try {
        findName = await personData.findOne({Id: Data.Id})
        if(findName==null){
            const newData = await Data.save()
            res.status(201).json(newData)
        }else
        {
            res.json({message:"This Controller already exist!"})
        }

    } catch (err) {
        res.status(400)
    }
})

//regist one
router.post('/regist', async(req,res) => {
    let findName
    
    const Data = new personData({
        userName: req.body.userName,
        admin: req.body.admin
    })
    try {
        findName = await personData.findOne({userName: Data.userName})
        if(findName==null){
            const newData = await Data.save()
            res.status(201).json(newData)
        }else
        {
            res.json({message:"This User already exist!"})
        }

    } catch (err) {
        res.status(400)
    }
})

//updating one 
router.patch('/:id',getData,async (req,res) => {

    if(req.body.email != null){
        res.Data.email = req.body.email
    }
    if(req.body.admin != null){
        res.Data.admin = req.body.admin
    }
    if(req.body.authority != null){
        res.Data.authority = req.body.authority
    }

    try {
        const updateData = await res.Data.save()
        nameData = await userPasswordData.findOne({personID: req.params.id})
        if(req.body.admin!=null){
            nameData.admin = req.body.admin
            nameData.save()
        }
        
        res.json(updateData)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

//deleting one
router.delete('/:id',getData,async (req,res) => {
    try {
        await res.Data.remove()

        nameData = await userPasswordData.findOne({personID: req.params.id})
        console.log(nameData)
        nameData.remove()

        res.json({message:'Delete success'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
    
})



//function for finding data by ID
async function getData(req, res, next){
    let Data
    try {
        Data = await personData.findById(req.params.id)
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
        nameData = await personData.findOne({userName: req.params.userName})
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