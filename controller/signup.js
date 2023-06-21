const signupmodel=require('../models/signup')
const bcrypt=require('bcrypt')
exports.signup=async(req,res)=>{


        const NAME = req.body.NAME
        const EMAIL = req.body.EMAIL
        const PHONENUMBER=req.body.PHONENUMBER
        const PASSWORD = req.body.PASSWORD
        const userExist=await signupmodel.findAll({where:{EMAIL:EMAIL}})
        console.log(userExist)
        if (userExist){
            res.json({message:'user already exist'})
        }
        else{
        console.log(NAME,PHONENUMBER)
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(PASSWORD, salt, function (err, hash) {
                const info = signupmodel.create({ NAME, EMAIL,PHONENUMBER, PASSWORD: hash }).then(() => {
                    res.status(201).json({ message: 'Successfuly create new user' })
                }).catch(err => {
                    res.status(403).json(err);
                })
    
            })
        })
    }
    
    
    }

