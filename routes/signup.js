const express=require('express')
const sequelize=require('../UTIL/database')
const controllers=require('../controller/signup')

const routes=express.Router()
routes.post('/signup',controllers.signup)

module.exports=routes