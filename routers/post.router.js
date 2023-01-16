const { Router }=require('express');
const jwt=require('jsonwebtoken');
const { PostModel } = require('../model/post.model');
require('dotenv').config();
const key=process.env.key;

const postRouter=Router();

postRouter.get('/',async(req,res)=>{
    // console.log(req.headers);
    const token=req.headers.authorization;
    const id=jwt.verify(token,key)
    // console.log(id);
    const data=await PostModel.find({authorId:id.id});
    res.json({data});
})

// /posts 
// /posts/update 
// /posts/delete


postRouter.post('/create',async(req,res)=>{
    // console.log(req.headers);
    const token=req.headers.authorization;
    const id=jwt.verify(token,key)
    // console.log(id);
    const {title,body,device}=req.body;
    const post=new PostModel({title,body,device,authorId:id.id})
    // console.log(post);
    await post.save();
    res.send(`post created`)
})
postRouter.patch('/update/:postId',async(req,res)=>{
    // console.log(req.headers);
    const postid=req.params.postId;
    const post=await PostModel.findOne({_id:postid})
    if(post){
        const token=req.headers.authorization;    
        const id=jwt.verify(token,key)
        // console.log(id);
        if(id.id==post.authorId){
            await PostModel.findOneAndUpdate({_id:postid},req.body);
            res.send("data has been updated");
        }
        else{
            res.send('not authorized');
        }
    }
    else{
        res.send('post now found')
    }
    
})
postRouter.delete('/delete/:postId',async(req,res)=>{
    const postid=req.params.postId;
    const post=await PostModel.findOne({_id:postid})
    if(post){
        const token=req.headers.authorization;    
        const id=jwt.verify(token,key)
        // console.log(id);
        if(id.id==post.authorId){
            await PostModel.findOneAndDelete({_id:postid},req.body);
            res.send("data has been deleted");
        }
        else{
            res.send('not authorized');
        }
    }
    else{
        res.send('post now found')
    }
})

module.exports={postRouter}