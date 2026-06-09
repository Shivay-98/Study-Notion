const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");

exports.updateProfile = async (req,res) =>{
    try{
        // get data 
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        const id = req.user.id;

        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            });
        }
        const userDetails = await User.findOne({ _id: id });
        const profileId = userDetails.additionalDetail;
        const profileDetails = await Profile.findOne(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        profileDetails.about = about;
        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"profile updated"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error: error.message
        })
    }
}

// delete account
exports.deleteAccount = async (req,res) =>{
    try{
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findOne({ _id: id });
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"user id invalid"
            });
        }
        // profile delete 
        await Profile.findByIdAndDelete(userDetails.additionalDetail);
        // course detail and delete
        // const courseDetail = await Course.findById(userDetails.courses);
        await Course.findByIdAndUpdate(
            userDetails.courses,
            {
                $pull: { studentsEnrolled: id }
            },
            { new: true }
        );     
       // user delete
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success:true,
            message:"profile deleted"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error: error.message
        })
    }
}

exports.getAllUserDetails = async (req,res) =>{
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalsDetails").exec();

    }    catch(error){
        return res.status(500).json({
            success:false,
            error: error.message
        })
    }
}