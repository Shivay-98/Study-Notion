const Course = require("../models/course");
const Tag = require("../models/Tags");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

exports.createCourse = async (req,res) =>{
    try{
        // fetch data
        const {courseName, courseDescription, whatYouWillLearn , price , tag } = req.body;
        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation 

        if(!courseName || courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"all fields are required",
            })
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("instructor Details",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"instructor details not found",
            });
        }

        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"tag details not found",
            });
        }

        // upload image to cloudinary 
        const thumnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        // create an entry 
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructor._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        // add the new couse to user schema to instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    course:newCourse._id,
                },
            },
            {new:true},
        )

        return res.status(200).json({
            success:true,
            message:"course created successfully",
            data:newCourse,
        });
            
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"failed to create course",

        })
    }
}


// getAllcourses
exports.showAllCourses = async (req,res) =>{
    try{
        const allCourses = await Course.find({},{courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReviews:true,
        })

        return res.status(200).json(
            {
                success:true,
                message:"data for all coruse fetched successfully",
                data:allCourses
            }
        )

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"failed to fetch course",

        })

    }
}

