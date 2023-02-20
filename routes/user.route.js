const express= require("express")
const jwt= require("jsonwebtoken")
const bcrypt= require("bcrypt")
const { userModel } = require("../models/user.model")

const userRouter= express.Router()

//registration
userRouter.post("/register",async(req,res)=>{
try{
    bcrypt.hash(req.body.password, 5,async (err, hash) =>{
        // Store hash in your password DB.
        if(err){
            console.log(err)
        }
        else if(hash){
         
            req.body.password= hash
            let newUser= new userModel(req.body)
            await newUser.save()
            res.send("user has been registered")
            console.log("user has been registered")
        }

    });
   
   

}
catch{
res.send("can not register the user")
console.log("can not register the user")
}
})

//login 

userRouter.post("/login",async(req,res)=>{
    let email= req.body.email
  
    try{
let user=await userModel.find({email})

if(user){
    bcrypt.compare(req.body.password, user[0].password, (err, result)=> {
        if(result){
            const token= jwt.sign({user:user[0]._id},"masai")
            res.send({"msg":"login successfull", "token":token})
            console.log("login successfull")
        }
        else res.send("please enter correct password")
    });
}
else {
    res.send("please enter correct email")
}
    }
    catch{
res.send("can not login")
    }
})

module.exports={
    userRouter
}
