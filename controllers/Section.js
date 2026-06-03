const Course = require("../models/Course");
const Section = require("../models/Section");
exports.createSection = async(req , res) =>{
    try{
        const {sectionName , courseId } = req.body;
        if(!sectionName || !courseId){
            res.status(400).json({
                success:false,
                message:"missing properties"
            });
        }
        const newSection = await Section.create({sectionName});
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                   {_id:courseId},
                    {
                        $push:{
                            courseContent:newSection._id,
                        },
                    },
                    {new:true}
                    ).populate({
                    path:"courseContent",
                    populate:{
                        path:"subSection"
                    }
                    });
               
        return res.status(200).json({
            success:true,
            message:"section created succesfully",
            updatedCourseDetails,
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"error occured" + err,
        })
    }
}


exports.updateSection = async(req,res) =>{
    try{
        // data input 
        const {sectionName, sectionId} = req.body;

        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"missing properties"
            });
        }
        // update
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});
        return res.status(200).json({
            success:true,
            message:"section updated succesfully",
        })
    }
    catch{
        return res.status(500).json({
            success:false,
            message:"error occured while updating",
        })
    }
}

exports.deleteSection = async(req,res)=>{
    try{
        const { sectionId, courseId } = req.params;

        await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId
            }
        });

        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success:true,
            message:"section deleted successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error occurred while deleting section",
            error:error.message
        })
    }
}