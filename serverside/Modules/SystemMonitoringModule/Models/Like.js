const { timeStamp } = require('console');
const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    postId:{
        type: String,
    }
},{
    timeStamp: true,
})

module.exports = mongoose.model('Like', LikeSchema);