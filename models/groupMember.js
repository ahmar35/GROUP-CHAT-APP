const sequelize=require('../UTIL/database')
const seq=require('sequelize')
const groupMemberInfo=sequelize.define('groupMember',{
    id:{
        type:seq.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
})
module.exports=groupMemberInfo