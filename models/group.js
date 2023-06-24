const sequelize=require('../UTIL/database')
const seq=require('sequelize')
const groupinfo=sequelize.define('groupinfo',{
    id:{
        type:seq.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    GROUPNAME:{
        type:seq.STRING
    },
})
module.exports=groupinfo