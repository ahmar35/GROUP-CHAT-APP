const User=require('../models/signup')
const jwt=require('jsonwebtoken')
const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        console.log(token)
        var user=jwt.verify(token,'secretkey')
        console.log('userID====',user.USERId)

        User.findByPk(user.USERId).then(user=>{

            req.user=user

            console.log(req.user)

            next()


        })

            
        

    }catch(err){
        console.log(err)
    }

}
module.exports={authenticate}