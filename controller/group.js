const group=require('../models/group')
const chat=require('../models/chat')
const user=require('../models/signup')

exports.group=async(req,res)=>{
    const GROUPNAME=req.body.name
    const groupInfo=await group.create({GROUPNAME:GROUPNAME,userId:req.user.id})

    res.status(200).json({groupInfo})

}
exports.getGroupInfo=async(req,res)=>{
    const groups=await group.findAll({where:{userId:req.user.id}})
    res.status(200).json({groups})

}
exports.postGroupChat=async(req,res)=>{
    const msg=req.body.text

    const groupName=req.body.groupname
    const groupInfo=await group.findAll({where:{GROUPNAME:groupName}})
     console.log('nnnnnnnnnnnn')
    console.log(groupInfo.id)
    console.log(groupInfo[0].id)
    await chat.create({NAME:req.user.NAME,message:msg,userId:req.user.id,groupinfoId:groupInfo[0].id})
    res.status(200).json({message:"sent"})

}

exports.getGroupMember=async(req,res)=>{
    console.log(req.params.groupname)
    const info=await group.findAll({where:{GROUPNAME:req.params.groupname}})
    console.log(info[0].id)
    const MemberName=[]
     for(let i=0;i<info.length;i++){
        const groupmember=await user.findAll({where:{id:info[i].userId}})
        MemberName.push(groupmember[0].NAME)
     }
        res.status(200).json({MemberName})

    
    


}
exports.getGroupMsg=async(req,res)=>{
    const info=await group.findAll({where:{GROUPNAME:req.params.groupname}})

    const groupMsg=await chat.findAll({where:{groupinfoId:info[0].id}})
    res.status(200).json({groupMsg})

}
exports.addMember=async(req,res)=>{
    console.log(req.body.user)
    const User=await user.findAll({where:{NAME:req.body.name}})
    


    if(User.length>0){

    const GROUPNAME=req.body.groupName
    const groupInfo=await group.create({GROUPNAME:GROUPNAME,userId:User[0].id})
    res.status(200).json({message:'added to group'})
    }else{
        res.status(404).json({message:'user doesnt exist'})

    }
}