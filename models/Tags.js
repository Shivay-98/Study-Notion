const mongoose = require("mongoose");
const course = require("./course");

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  course: {
    type:Schema.Types.ObjectId,
    refs: "Course",
  }
});

module.exports = mongoose.model("Tags",tagSchema);
