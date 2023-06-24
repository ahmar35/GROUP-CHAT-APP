const sequelize=require('../UTIL/database')
const seq=require('sequelize')
const user=sequelize.define('user',{
    id:{
        type:seq.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    NAME:{
        type:seq.STRING
    },
    EMAIL:{
        type:seq.STRING
    },
    PHONENUMBER:{
        type:seq.STRING
    },
    PASSWORD:{
        type:seq.STRING
    }

})
module.exports=user