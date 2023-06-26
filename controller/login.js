const signupmodels=require('../models/signup')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
function generateAccessToken(id){
    return jwt.sign({USERId:id},process.env.TOKEN_SECRET)
}
exports.login=async(req,res)=>{
    const EMAIL=req.body.EMAIL
    const PASSWORD=req.body.PASSWORD
    try{
    const user=await signupmodels.findAll({where:{EMAIL:EMAIL}})
    if (user.length>0){


            bcrypt.compare(PASSWORD, user[0].PASSWORD, (err, result) => {
                if (err) {
                    res.json({ message: 'Something Went Wrong' })
                } else if (result == true) {
                    res.status(201).json({message:'logged in successfully',token:generateAccessToken(user[0].id)})
                } else {
                    return res.json({ message: 'Incorrect Password' })
                }
            })
        }
    else {
        return res.json({ message: 'User Not Found' })
        }
    }catch(err){
        console.log(err)
    }
    } 