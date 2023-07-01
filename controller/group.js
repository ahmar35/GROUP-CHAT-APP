const group=require('../models/group')
const chat=require('../models/chat')
const user=require('../models/signup')
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer().single('file'); // Configure multer to handle single file uploads

const s3 = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET
});

exports.group=async(req,res)=>{
    const GROUPNAME=req.body.name
    const groupInfo=await group.create({GROUPNAME:GROUPNAME,userId:req.user.id,isAdmin:true})

    res.status(200).json({groupInfo})

}
exports.getGroupInfo=async(req,res)=>{
    const groups=await group.findAll({where:{userId:req.user.id}})
    res.status(200).json({groups})

}
exports.adminCheck=async(req,res)=>{
    const groupMember=await group.findAll({where:{
        GROUPNAME:req.params.groupname,
        userId:req.user.id
    }})
    res.status(200).json({groupMember})

}
exports.makeAdmin=async(req,res)=>{
    await group.update(
        { isAdmin: true },
        {
          where: {
            GROUPNAME: req.params.groupname,
            userId: req.params.id,
          }
        }
      )
      res.status(200).json({message:'done'})
    
}

exports.postGroupChat = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error('Failed to upload file:', err);
        res.status(500).json({ message: 'Failed to upload file' });
        return;
      }
  
      const { text, groupname } = req.body;
      const file = req.file;
  
      
        let fileUrl = null;
        if (file) {
          const params = {
            Bucket: 'groupchatappfile',
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
          };

      const uploadResult = await s3.upload(params).promise();
      fileUrl = uploadResult.Location;
    }

    const groupInfo = await group.findAll({ where: { GROUPNAME: groupname } });

    await chat.create({
      NAME: req.user.NAME,
      message: text,
      userId: req.user.id,
      groupinfoId: groupInfo[0].id,
      fileurl: fileUrl,
      filename:req.file.originalname
    });

    res.status(200).json({message:'sent' });
  
})

}

exports.getGroupMember=async(req,res)=>{
    const info=await group.findAll({where:{GROUPNAME:req.params.groupname,
    
    }})
    if(info){
    const MemberName=[]
     for(let i=0;i<info.length;i++){
        const groupmember=await user.findAll({where:{id:info[i].userId}})
        MemberName.push({id:groupmember[0].id,NAME:groupmember[0].NAME,isAdmin:info[i].isAdmin})
     }
        res.status(200).json({MemberName})

    }  
}
exports.getGroupMemberlist=async(req,res)=>{
    const groupMember=await group.findAll({
        where:{
        GROUPNAME:req.params.groupname,
        isAdmin:true
    }})
    const adminList=[]
     for(let i=0;i<groupMember.length;i++){
        const User=await user.findAll({where:{id:groupMember[i].userId}})
        adminList.push(User[0].NAME)

     }
     res.status(200).json({adminList})


    }
    exports.removeGroupMember=async(req,res)=>{
        
        await group.destroy({
            where:{
                GROUPNAME:req.params.groupname,
                userId:req.params.id
            }

        })
        res.status(200).json({message:'done'})

    }



exports.getGroupMsg=async(req,res)=>{
    const info=await group.findAll({where:{GROUPNAME:req.params.groupname}})

    const groupMsg=await chat.findAll({where:{groupinfoId:info[0].id}})
    res.status(200).json({groupMsg})

}
exports.addMember=async(req,res)=>{
    const User=await user.findAll({where:{NAME:req.body.name}})
    

    if(User.length>0){

    const GROUPNAME=req.body.groupName
    const groupInfo=await group.create({GROUPNAME:GROUPNAME,userId:User[0].id,isAdmin:false})
    res.status(200).json({message:'added to group'})
    }else{
        res.status(404).json({message:'user doesnt exist'})

    }
}