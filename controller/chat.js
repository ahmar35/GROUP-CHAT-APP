const chat=require('../models/chat')
const user=require('../models/signup')
const groups=require('../models/group')

exports.getMsg=async(req,res)=>{
    const messages=await chat.findAll({where:{groupinfoId:null}})
    res.status(200).json({messages})


}