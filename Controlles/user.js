const userModel = require('../Schemas/user')  //import of schema struct 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async function(req,res){
    try{
        let newUser = new userModel(req.body)   //create a schema or a uset

        const hashedpsw = await bcrypt.hash(req.body.password , 10)  //crypting the psw
        newUser.password = hashedpsw

        let user = await newUser.save() //save the schema
        return res.json({message:'User registered sucessfully' , user:{name:user.name , email:user.email}})  //send the status

    }catch(err){
        return res.status(400).send({message : err})   //handling the error
    }
}

exports.login = async function(req,res){
    try{
        let user = await userModel.findOne({email : req.body.email})

        if(!user){
            return res.status(400).json({message : 'Authincation Failed .. invalid email or password' })
        }

        if((await user.copmarePassword(req.body.password)) === false){
            return res.status(400).json({message : 'Authincation Failed .. invalid email or password' })
        }

        const token = jwt.sign({email:user.email , name:user.name , _id:user.id , role:user.role} , 'ridaI')
        return res.json({message:'User Loggedin sucessfully' , user:{name:user.name , email:user.email , token:token}})

    }catch(err){
        return res.status(400).send({message : err})   //handling the error
    }
}

exports.Alluser = async function(req,res){
    try{
        const users = await userModel.find()
        res.json({"Users": users , "status":200})
    }catch(err){
        return res.status(400).send({message : err})   //handling the error
    }
}