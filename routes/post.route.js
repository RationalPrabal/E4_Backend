const express= require("express")
const { postModel } = require("../models/post.model")

const postRouter= express.Router()


//read notes 

postRouter.get("/",async(req,res)=>{
try{
const posts=await  postModel.find()
res.send(posts)
}
catch{
res.send("please login ")
}
})

//create notes

postRouter.post("/create",async(req,res)=>{
   
    try{
    let newPost = new postModel(req.body)
    await newPost.save()
    res.send("post has been added")
    }
    catch{
        res.send("can not add the post")
    }
    })

    // delete notes
    postRouter.delete("/delete/:id",async(req,res)=>{
        try{
        await postModel.findByIdAndDelete(req.params.id)
        res.send("post has been deleted")
        }
        catch{
            res.send("can not delete the post")
        }
        })

 // update notes

 postRouter.patch("/update/:id",async(req,res)=>{
    try{
    await postModel.findByIdAndUpdate(req.params.id,req.body)
    res.send("post has been updated")

    }
    catch{
        res.send("can not update the post")
    }
    })


module.exports={
    postRouter
}