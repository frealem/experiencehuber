const mongoose = require('mongoose');
const { type } = require('os');

const PostSchema = mongoose.Schema({
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
    like:{
        type: Number,
    },
    disLike:{
        type: Number,
    },
    share:{
        type: Number,
    },
    rating:{
        type: Number,
    },
    imageURL:{
        type: [String],
        required: [true, "The image is required!"],
    },
    tags:{
        type: [String],
    },
    special:{
        type: Boolean,

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
},{
    timestamps: true,
});

// Create a text index on the "title" and "description" fields
PostSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Post', PostSchema);