const mongoose = require('mongoose');

const CommunityGuideLineSchema = mongoose.SChema({
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

modules.exports = mongoose.model('CommunityGuideLine', CommunityGuideLineSchema);