const mongoose = require('mongoose');


const PostReviewSchema = mongoose.Schema({
    posterId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "The poster id is required"],
    },
    postId:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, "The post id is required"],
    },
    description: {
        type: String,
        required: [true, "The description is required"],
    },
    rate: {
        type: Number,
        required: [true, "The rate is required"],
    }

},{
    timestamps: true,
});

module.exports = mongoose.model('PostReview', PostReviewSchema)