const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async(req,res) =>{
    try{
        // fetch data 
        const {sectionId,title , description , timeDuration } = req.body;
        // extract file video
        const video = req.files.videoFile;
        if(!sectionId || !title || !description || !video ){
            return res.status(400).json({
                success: false,
                message:"all fields are required"
            })
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        // update section
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl: uploadDetails.secure_url,
        })
        // update section 
        const updateSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                        {$push:{
                                                            subSection:SubSectionDetails._id
                                                        }},
                                                        {new:true}).populate("subSection");
        // return res
        return res.status(200).json({
            success:true,
            message:"successfully created subbsection"
        })
    }
    catch {
        return res.status(500).json({
            success:false,
            message:"error creating subbsection"
        })
    }
}


exports.updateSubSection = async(req,res) =>{
    try{
        const {title, subSectionId, description ,timeDuration} = req.body;
        const video = req.files.videoFile;
        if(!subSectionId || !title || !description  ){
            return res.status(400).json({
                success: false,
                message:"all fields are required"
            })
        }
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        const updateSubSection = await SubSection.findByIdAndUpdate({_id:subSectionId},{
                                                              title:title, 
                                                              description:description,
                                                              videoUrl: uploadDetails.secure_url 
                                                            },
                                                            {new:true});
        return res.status(200).json({
            success:true,
            message: "sub section updated"
        })
    }
    catch{
        return res.status(500).json({
            success:false,
            message:"error updating subbsection"
        })
    }
}


exports.deleteSubSection = async (req,res) =>{
    try{
        const { sectionId, subSectionId } = req.params;

        // remove subsection reference from section
        await Section.findByIdAndUpdate(sectionId,{
            $pull:{
                subSection: subSectionId
            }
        });

        // delete subsection document
        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success:true,
            message:"subsection deleted successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"error occurred while deleting subsection",
            error:error.message
        })
    }
}