const express=require('express')
const path = require('path')
const bodyparser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
const Sequelize=require('./UTIL/database')
const user=require('./models/signup')
const message=require('./models/chat')
const group=require('./models/group')
const signuproutes=require('./routes/signup')
const loginroutes=require('./routes/login')
const chatroutes=require('./routes/chat')
const grouproutes=require('./routes/group')
const app=express()
app.use(cors({
    origin:'http://16.170.120.245:3000',

}))
app.use(bodyparser.json())

app.use(signuproutes)
app.use(loginroutes)
app.use(grouproutes)
app.use((req,res)=>{

    res.sendFile(path.join(__dirname,`${req.url}`))
})

app.use(chatroutes)
user.hasMany(message)
message.belongsTo(user)
user.hasMany(group)
group.belongsTo(user)
group.hasMany(message)
message.belongsTo(group)
const users={}

Sequelize.sync()
app.listen(process.env.PORT)