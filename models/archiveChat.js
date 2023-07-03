const sequelize=require('../UTIL/database')
const seq=require('sequelize')
const archivechat=sequelize.define('archivechat',{
    id:{
        type:seq.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    NAME:{
        type:seq.STRING
    },
    message:{
        type:seq.STRING
    },
    fileurl:{
        type:seq.STRING
    },
    filename:{
        type:seq.STRING
    }

})
module.exports=archivechat