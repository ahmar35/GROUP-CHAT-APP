const sequelize=require('../UTIL/database')
const seq=require('sequelize')
const chat=sequelize.define('message',{
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

})
module.exports=chat