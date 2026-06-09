const {instace} = require("../config/razorpay")
const {mongoose} = require("mongoose")
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/template/courseEnrollmentEmail")


exports.capturePayment = async(req,res) =>{
    const {course_id} = req.body;
    const userId = req.user.id;
    if(!course_id){
        return res.status(404).json({
            success:false,
            message:"please provide vaid course id"
        })
    }
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.status(404).json({
                success:false,
                message:"could not find the course"
            })
        }
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(404).json({
                success:false,
                message:"student is already enrolled "
            });
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
             message:"error occured " + err.message,
            })
    }

    // create
    const amount = course.price;
    const currency = "INR";

    const options ={
        amount: amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course._id,
            userId
        }
    }
    try{
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success:true,
            coruseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currenct:paymentResponse.currency,
            amount:paymentResponse.amount,         
        });
    }
    catch(err){
        console.log(err);
        res.json({
            success:false,
            message:"error occur while payment"
        })
    }


};

// verify signature
exports.verifySignature = async(req,res) =>{
    const webhooksecret = "123456";
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256",webhooksecret);
    shasum.update(JSON.stringify(req.body));
    const digest =  shasum.digest("hex");

    if (digest === signature) {
       console.log("Webhook verified");
       const {courseId,userId} = req.body.payload.payment.entity.notes;
       try{
        const enrolledCourse = await Course.findOneAndUpdate(courseId,
            {$push:{studentsEnrolled:userId}},
            {new:true}
        );
        if(!enrolledCourse){
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }
        console.log(enrolledCourse);
        //find the student and add the course to their list enrolled courses 
        const enrolledStudent = await User.findOneAndUpdate({_id:userId},
            {$push:{course:courseId}},
        {new:true}
          );
          console.log(enrolledStudent);

          // mail send
          const emailResponse = await mailSender(
            enrolledStudent.email,
            "congrats from shiva",
            "congratulations , you are enrolled into a new course"
          );
          console.log(emailResponse);
          return res.status(200).json({
            success:true,
            message:"signature verified and course added",
          });
       }
       catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
       }
    }
    else{
        return res.status(400).json({
            success:false,
            message:"invalid request "
        })
    }
};