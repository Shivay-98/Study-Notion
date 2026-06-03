const Tag = require("../models/Tags");

exports.createTag = async (req ,res) =>{
   try{
       const {name,description} = req.body;
       if(!name || !description) {
        res.status(500).json({
            success:false,
            message:"enter all tags field"
        })
        const tagDetails = await Tag.create({
            name:name,
            description:description,
        })
        console.log(tagDetails);
        Tag.bulkSave();
        res.status(200).json({
            success:true,
            message:"tag created successfully"
        })
       }
   }
   catch{
    res.status(500).json({
        success:false,
        message:"error creating entry"
    })
   }
}

exports.showAlltag = async (req,res) =>{
    try{
        const showAll = await Tag.find({},{name:true,description:true});
        console.log(showAll);
        res.status(200).json({
            success:true,
            message:"all tags are shown"
        })
    }
    catch{
         res.status(500).json({
        success:false,
        message:"error showing tag"
    })
    }
}