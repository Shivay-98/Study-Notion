const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");


// resetpassword token
exports.resetPasswordToken = async (req,res) =>{
    try{
        // get email
    const email = req.body.email;
    // check user for this email
    const user = await User.findOne({email});
    if(!user){
        return res.json({
            success:false,
            message:"not valid user"
        })
    }
    // generate token
    const token = crypto.randomUUID();
    //update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate({email:email},{
        token:token,
        resetPasswordExpires: Date.now() + 5*60*1000,
    },{new:true});
    
   // create url
    const url = `http://localhost:3000/update-password/${token}`;
    await mailSender(email,
        "Password reset link",
        `Password reset link: ${url}`);
    // return response
    return res.json({
        success:true,
        message:"password reset link sent successfully"
    })
    }
    catch(err){
    console.log(err);
    return res.status(500).json({
        success:false,

    })
    }
}

// reset password 
exports.resetPassword = async (req,res) =>{
    try{
        // fetch data
        const {password,confirmPassword,token} = req.body;
        // validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"password not match"
            })
        }
        // get userdetails
        const userDetails  = await User.finOne({token:token});
        // if no entry invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message: "token is invalid",
            });
        }
        // token time check
        if(userDetails.resetPasswordExpires < Date.now() ){
            return res.json({
                success: false,
                message: "token is expired"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );

        return res.json({
            success:true,
            message:"password reset successful",
        })
    }
    catch{

    }
}