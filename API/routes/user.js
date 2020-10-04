const express = require('express')
const router = express.Router()
const personData = require('../models/personData')
const userPasswordData = require('../models/userPasswordData')
const bcrypt = require('bcrypt')

//test get list
router.get('/', async (req,res)=>{
    try {
        const userData = await userPasswordData.find()
        res.json(userData)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
} )


//regist account
router.post('/regist', async (req, res) => {
    try {   const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const passwordData = new userPasswordData ({
            password: hashedPassword,
            email: req.body.email,
            personID: req.body.personID,
            admin: false
        })
        //test hash
        const saveData = await passwordData.save()
        res.status(201).json('success')     

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//test login
router.post('/login', async (req, res) =>{
    const userID = await personData.findOne({artName: req.body.username})   
    if(userID == null){
        return res.status(400).send('Cannot find user')
    }else{
        const user = await userPasswordData.findOne({personID: userID._id}) 
        try {
            //console.log(req.body.password)
            console.log(user.password)
            if(await bcrypt.compare(req.body.password,user.password)) {
                if(user.admin == true){
                    res.json({admin: true, message: 'Success'})
                }else{
                    res.json({admin: false, message: 'Success'})
                }
                
            }else{
                res.json({message: 'Not allow'})
            }
        } catch (error) {
            res.status(500).send(error.message)
        }

    }

   
})

//google login
router.post('/google', async (req,res) => {
    const userID = await personData.findOne({artName: req.body.username})
    const userData = new personData({
        artName:req.body.username,
        email:req.body.email,
        googleUid:req.body.uid
    })
    try {
        if(userID==null){
        
            const new_userData =await userData.save()
            res.status(201).json({id:new_userData._id})            
        }else{

            res.status(201).json({id:userID._id})
        }
        
    } catch (error) {
        res.status(500).send(error.message) 
    }


   
})


module.exports = router
