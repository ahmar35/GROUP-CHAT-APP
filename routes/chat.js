const express=require('express')
const sequelize=require('../UTIL/database')
const controllers=require('../controller/chat')
const auth=require('../middleware/auth')
const routes=express.Router()

routes.get('/getMsg',controllers.getMsg)


module.exports=routes