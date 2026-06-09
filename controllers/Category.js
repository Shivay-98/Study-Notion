const Category = require("../models/Category");
const course = require("../models/course");

exports.createCategory = async (req,res) =>{
    try{
        const {name , description} = req.body;
        if(!name){
            return res.status(404).json({
                success:false,
                message:"all fields are required"
            })
        }
        const categoryDetails = await Category.create({
            name:name,
            description:description
        });
        console.log(categoryDetails)
        return res.status(200).json({
            success:true,
            message:"category created successfully"
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

exports.showAllCategory = async(req,res)=>{
    try{
    const allCategories = await Category.find({},
                                {name:true,description:true});
    return res.status(200).json({
        success:true,
        message:allCategories,
    })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
} 

exports.categoryPageDetails = async (req,res)=>{
    try{
        // get category id 
        const {categoryId} = req.body;
        const selectedCategory = await Category.findById(categoryId)
                                                .populate("courses").exec();
        // validation
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"data not found",
            });
        }
        const differentCategories = await Category.find({_id:{$ne:categoryId},})
                                                    .populate("courses").exec();
        // get top courses 
        const topSellinnCourse = await Category.find({})
                                            .populate({
                                                path:"courses",
                                                options:{sort: {ratingAndReviews : -1},limit : 5}
                                            }).exec();
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
                topSellinnCourse
            }
        })                                    
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}