const express=require('express')
const sequelize=require('../UTIL/database')
const controllers=require('../controller/group')
const auth=require('../middleware/auth')
const routes=express.Router()
routes.post('/creategroup',auth.authenticate,controllers.group)
routes.get('/getGroupInfo',auth.authenticate,controllers.getGroupInfo)
routes.post('/groupChat',auth.authenticate,controllers.postGroupChat)
routes.get('/groupMember:groupname',controllers.getGroupMember)
routes.get('/getGroupMsg:groupname',controllers.getGroupMsg)
routes.post('/addMember',controllers.addMember)

module.exports=routes