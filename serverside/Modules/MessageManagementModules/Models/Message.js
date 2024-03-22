const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required:[true, "The sender id is required!"]
    },
    recieverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required:[true, "The reciever id is required!"]
    },
    content: {
        type: String,
        required: [true, "Please enter the message to send!"],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model('Message', MessageSchema);