const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "The owner id is required!"],
    },
    
    theme: {
        type: Number,
    },
    preferedCategories:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',
    },
    likedPosts:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
    },
    previousPosts:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post',
    },
    followings:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'Account',
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Account', AccountSchema);