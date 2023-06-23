const express=require('express')
const sequelize=require('../UTIL/database')
const controllers=require('../controller/chat')
const auth=require('../middleware/auth')
const routes=express.Router()
routes.post('/chat',auth.authenticate,controllers.chat)
routes.get('/user',controllers.getUser)

module.exports=routes