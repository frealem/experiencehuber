const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    commeterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "The commeter id is required!"],
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, "The post id is required!"],
    },
    content: {
        type: String,
        required: [true, "please enter text to comment!"],
    },    
},{
    timestamps: true,
});

module.exports = mongoose.model('Comment', CommentSchema);