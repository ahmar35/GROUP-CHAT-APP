const express=require('express')
const sequelize=require('../UTIL/database')
const controllers=require('../controller/login')

const routes=express.Router()
routes.post('/login',controllers.login)

module.exports=routes