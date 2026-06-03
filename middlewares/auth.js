const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req ,res, next) =>{
    try{
          // extract token
          const token = req.cookies.token || req.body.token 
          || req.header("Authorization").replace("Bearer ","");

        // if token mising ,then return response
        if(!token){
            res.status(401).json({
                success:false,
                messagage:"token is missing"
            })
        }
        // verify 
        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            });
        }
        next();
    }
    catch(error){
   return res.status(401).json({
                success:false,
                message:"token is invalid"
            });
    }
}


exports.isStudent = async (req,res,next) =>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for students"
            })
        }
          next();
    }
    catch(error){
        return res.status(401).json({
              success:false,
         message: "user role cannot verified,please try again",
        })
    }
}

// admin
exports.isAdmin = async (req,res,next) =>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for admin"
            })
        }
          next();
    }
    catch(error){
        return res.status(401).json({
              success:false,
         message: "user role cannot verified,please try again",
        })
    }
}

// is instructor

exports.isInstructor = async (req,res,next) =>{
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for instructor"
            })
        }
          next();
    }
    catch(error){
        return res.status(401).json({
              success:false,
         message: "user role cannot verified,please try again",
        })
    }
}