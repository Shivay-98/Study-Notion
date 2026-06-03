const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ratingAndReview = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required : true,
        ref: "User"

    },
    rating: {
        type:Number,
        required: true,
    },
    review: {
        type: String,
        required : true
    }

});

module.exports = mongoose.model("RatingAndReview",ratingAndReview);
