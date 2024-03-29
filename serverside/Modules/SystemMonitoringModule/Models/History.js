const mongoose = require('mongoose');

const HistorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('History', HistorySchema);