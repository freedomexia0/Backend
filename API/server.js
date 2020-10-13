require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')


mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,useUnifiedTopology: true})
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open',() => console.log('Connected to Database'))

app.use(express.json())
app.use(cors())

const personDataRouter = require('./routes/personDataRouter')
const user = require('./routes/user')
const alarm = require('./routes/alarmData')
app.use('/person',personDataRouter)
app.use('/user',user)
app.use('/alarm',alarm)


app.listen(3000, () => console.log('Server Started'))