const chat=require('../models/chat')
const user=require('../models/signup')
exports.chat=async(req,res)=>{
    const msg=req.body.text
    console.log(req.user.id)

    await chat.create({message:msg,userdetailId:req.user.id})
    res.status(200).json({message:"sent"})
}
exports.getUser=async(req,res)=>{
    const users=await user.findAll()
    res.status(200).json({users})
  


}