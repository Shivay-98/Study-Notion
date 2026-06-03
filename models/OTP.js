const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp:{
        type: Number,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
        expires: 5*60,
    }

});

// a function to send email
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse  = await mailSender(email,"verification email from studynotion  ",otp);
        console.log("email sent successfully: ",mailResponse);
    }
    catch(error){
        console.log("error occured while sending mails: ",error);
       throw error;
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",otpSchema);
