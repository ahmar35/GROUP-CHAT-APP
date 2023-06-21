const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
require('dotenv').config()

const Sequelize=require('./UTIL/database')

const signupmodel=require('./models/signup')
const signuproutes=require('./routes/signup')


const app=express()
app.use(cors({
    origin:'*',

}))



app.use(bodyparser.json())
app.use(signuproutes)

Sequelize.sync( )
app.listen(process.env.PORT)