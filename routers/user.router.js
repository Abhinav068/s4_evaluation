const { Router }=require('express');
const { UserModel } = require('../model/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
require('dotenv').config();

const salt=process.env.salt;
const key=process.env.key;
const userRouter=Router();

userRouter.get('/',async(req,res)=>{
    const data=await UserModel.find();

    res.send(`all users${data}`)
})

// /users/register 
// /users/login

userRouter.post('/register',async(req,res)=>{
    
    //check email and then add
    try {
        const {email,name,gender,password}=req.body;
        const data=await UserModel.findOne({email});
        console.log(req.body,data,password);
        if(!data){
            bcrypt.hash(password,+salt,async(err,hash)=>{
                if(err){
                    console.log('something went wrong',err);
                }
                else{
                    const user=UserModel({email,name,gender,password:hash});
                    await user.save();
                    console.log(user);
                    res.send('registered');
                }
            })
        }
        else{
            res.send(`user already exits`);
        }
        
    } catch (error) {
        console.log(error);
    }
})
userRouter.post('/login',async(req,res)=>{
    //compare pass
    //generate token
    const {email,password}=req.body;
    const data=await UserModel.findOne({email});
    console.log(req.body,data,data.password);
    bcrypt.compare(password,data.password,(err,hash)=>{
        if(err) console.log(`something went wrong${err}`);
        else{
            if(hash){
                const token=jwt.sign({id:data._id},key,{expiresIn:60*60*4})
                // console.log(token);
                res.status(201).json({token});
                
            } 
            else{
                req.send('invalid creds');
            }
        }
    })
    // res.send('logged in')
})


module.exports={userRouter}