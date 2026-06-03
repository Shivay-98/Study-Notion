const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
    
    courseID: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "Course"
    },
    completedVideos :{
         type: mongoose.Schema.Type.ObjectId,
         ref: "SubSection",
    }
});

module.exports = mongoose.model("CourseProgress",courseProgress);