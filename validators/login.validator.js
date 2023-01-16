const jwt=require('jsonwebtoken');
require('dotenv').config();
const key=process.env.key;
const checkLogin=(req,res,next)=>{
    const token=req.headers.authorization||null;    
    jwt.verify(token,key,(err,decoded)=>{
        if(err){
            res.status(401).json({msg:'please login first',err:err.message});
        }
        else{
            
            next();
        }
    })
    
}

module.exports={
    checkLogin
}