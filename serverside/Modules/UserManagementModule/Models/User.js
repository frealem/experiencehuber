const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName: String,
    phone:String,
    userName:{
        type: String,
        required: [true, "please enter username"],
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
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);