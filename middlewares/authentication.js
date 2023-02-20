const jwt= require("jsonwebtoken")

const authentication=(req,res,next)=>{
let token= req.headers.authorization
if(token){
    jwt.verify(token,"masai",(err,decoded)=>{
        if(decoded){
          req.body.author= decoded.userID
            next()
        }
        if(err){
            res.send("please login")
        }
    })
}
else{
    res.send("please login")
}

}

module.exports={
    authentication
}