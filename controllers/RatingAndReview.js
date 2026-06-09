const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

const createRating = async (req,res) =>{
    try{
        // get userid
        const userId = req.body;

        // fetch data
        const {rating,review,courseId} = req.body;
        // check if user is enrolled or not 
        const courseDetails = await Course.findOne(
                                    {_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}},
                                });
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"student is not enrolled in the course"
            })
        }

        // check if user multiple review
        const alreadyReviewed = await RatingAndReview.findOne({
                                                        user:userId,
                                                        course:courseId
                                                    })
        if(alreadyReviewed){
            return res.status(404).json({
                success:false,
                message:"student already reviewed"
            })
        }                                     
        // create rating
        const ratingReview = await RatingAndReview.create({
                                                   rating ,review,
                                                   course:courseId,
                                                   user:userId     
                                                 });
        // update course with this rating and review
        await Course.findByIdAndUpdate(courseId,
                                        {
                                            $push:{
                                                ratingAndReviews:ratingReview._id,
                                            }
                                        },{new:true});
        // return res
        return res.status(200).json({
            success:true,
            messaage:"successfully ratiing and review"
        })                              
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.messaage,
        })
    }
}


/// get average rating 
exports.getAverageRating = async (req,res)=>{
    try{
        // get course id
        const courseId = req.body.courseId;
        // calculate avg 
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])

        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,

            })
        }
        // if zero rating
        return res.status(200).json({
            success:true,
            message:"average rating is 0,no rating given till now ",
             averageRating:0
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.messaage,
        })
    }    
}

// get all rating and review
exports.getAllRating = async(req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
                                        .sort({rating:"desc"})
                                        .populate({
                                            path:"user",
                                            select:"firstName lastName email image"
                                        })
                                        .populate({
                                            path:"course",
                                            select:"courseName",
                                        }).exec();
        return res.status(200).json({
            success:true,
            message:"all review "
        })                               
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.messaage,
        })
    }
}