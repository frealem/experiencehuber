const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema({
    // the report is composed by this account
    reporterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Account', 
        required:[true, "The reporter Id is required!"], 
    },
    // the report is reported on this post
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, "The post id reported on is required!"],
    },
    //this is an atribute from the communityguideline
    reportCase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommunityGuideline',
        required: [true, "The report case is required!"],
    },
    reportDetail: {
        type: String,
    },
    // shows the current status of the report(handled or not)
    status: {
        type: Number,
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Report', ReportSchema);