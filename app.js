const express=require('express')
const path = require('path')
const bodyparser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
const Sequelize=require('./UTIL/database')
const { Op } = require('sequelize');

const user=require('./models/signup')
const message=require('./models/chat')
const group=require('./models/group')
const archivechat=require('./models/archiveChat')
const signuproutes=require('./routes/signup')
const loginroutes=require('./routes/login')
const chatroutes=require('./routes/chat')
const grouproutes=require('./routes/group')
const app=express()
const cron=require('node-cron')
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
const today=new Date();
const yesterday=new Date(today)
yesterday.setDate(yesterday.getDate()-1)

cron.schedule('0 12 * * *', async () => {

    const Chats =  await message.findAll({where:{ createdAt:{[Op.gt] : yesterday}}}) 

   if(Chats){
    Chats.forEach((msg)=>{
        archivechat.create({
            NAME:msg.NAME,
            message:msg.message,
            fileurl:msg.fileurl,
            createdAt:msg.createdAt,
            updatedAt:msg.updatedAt,
            userId:msg.userId,
            groupinfoId:msg.groupinfoId
        
        })
    })

     await message.destroy({ where: {createdAt:{[Op.gt] : yesterday}} })
}
 })
app.use(chatroutes)
user.hasMany(message)
message.belongsTo(user)
user.hasMany(group)
group.belongsTo(user)
group.hasMany(message)
message.belongsTo(group)
user.hasMany(archivechat)
archivechat.belongsTo(user)
group.hasMany(archivechat)
archivechat.belongsTo(group)
Sequelize.sync()
app.listen(process.env.PORT)