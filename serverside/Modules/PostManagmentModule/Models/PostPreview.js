const mongoose = require('mongoose');

const PostPreviewSchema = mongoose.Schema({
    // refers to the account by which this post is posted
    posterId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, "The poster id is required!"],
    },
    title:{
        type: String,
        required: [true, "Please enter the title of the post!"],
    },
    description: {
        type: String,
        required: [true, "Please enter the description of the post!"],
    },
    imageURL:{
        type: [String],
        required: [true, "The image is required!"],
    },
    tags:{
        type: [String],
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    location:{
        name: String,
        longitude: String,
        latitude: String,
        zoom: Number,
    }
});

module.exports = mongoose.model('PostPreview', PostPreviewSchema);