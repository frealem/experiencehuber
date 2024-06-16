const mongoose = require('mongoose');

const CommunityGuideLineSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "please enter CommunityGuideLine name"],
    },
    description: {
        type: String,
        required: [true, "please enter CommunityGuideLine description"],
    },
    reportCase: {
        type: String,
        required:[false, "would you "]
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('CommunityGuideline', CommunityGuideLineSchema);