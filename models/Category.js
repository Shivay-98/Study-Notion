const mongoose = require("mongoose");
const course = require("./course");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  courses:[ {
    type:Schema.Types.ObjectId,
    refs: "Course",
  }]
});

module.exports = mongoose.model("Category",categorySchema);
