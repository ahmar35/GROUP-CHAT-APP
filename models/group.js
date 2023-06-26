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
    isAdmin:{
        type:seq.BOOLEAN
    },
    

})
module.exports=groupinfo