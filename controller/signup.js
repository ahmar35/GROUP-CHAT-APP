const signupmodel=require('../models/signup')
const bcrypt=require('bcrypt')
exports.signup=async(req,res)=>{

try{
        const NAME = req.body.NAME
        const EMAIL = req.body.EMAIL
        const PHONENUMBER=req.body.PHONENUMBER
        const PASSWORD = req.body.PASSWORD
        const userExist=await signupmodel.findAll({where:{EMAIL:EMAIL}})
        if (userExist.length>0){
            res.json({message:'user already exist'})
        }
        else{
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(PASSWORD, salt,async function (err, hash) {
                const info = await signupmodel.create({ NAME, EMAIL,PHONENUMBER, PASSWORD: hash })
                    res.status(201).json({ message: 'Successfuly create new user' })
                })
    
            })
        
        
    }
}catch(err){
    
console.log(err)
}

    
    }

