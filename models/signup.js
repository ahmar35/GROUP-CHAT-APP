const sequelize=require('../UTIL/database')
const seq=require('sequelize')
const user=sequelize.define('userdetails',{
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
        type:seq.INTEGER
    },
    PASSWORD:{
        type:seq.STRING
    }

})
module.exports=user