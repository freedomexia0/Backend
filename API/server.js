require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Get = require('./functions/getValue')
var get = new Get()


mongoose.connect("mongodb://myUserAdmin:Tom199587!@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",{ useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))

app.use(express.json())
app.use(cors())

const personDataRouter = require('./routes/personDataRouter')
const user = require('./routes/user')
const alarm = require('./routes/alarmData')
const getValue = require('./functions/getValue')
app.use('/person',personDataRouter)
app.use('/user',user)
app.use('/alarm',alarm)


app.listen(3000, () => console.log('Server Started'))

setInterval(timer,5000);


function timer(){
  console.log("geting value from controller")
  get.getValue();
}