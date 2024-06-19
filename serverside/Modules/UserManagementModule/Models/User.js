const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName: String,
    userName:{
        type: String,
        required: [true, "please enter username"],
    },
    profilePictuerURL: {
        type:String,
    },    
    email:{
        type: String,
        required: [true, "please enter email"],
    },
    password: {
        type: String,
        required: [true, "please enter password"],
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: [true, "the role of user is not specified"],
    },
    bio: String,
},{
    timestamps: true,
});
// Create a text index on the "title" and "description" fields
UserSchema.index({ userName: 'text', fullName: 'text' });

module.exports = mongoose.model('User', UserSchema);