const mongoose = require('mongoose');

const NotificationsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, "User id is required"],
    },
    title: {
        type:String,
        required: [true, "Title is rerquired"],
    },
    detail: {
        type: String
    }
},{
    timestamp: true,
})

module.exports = mongoose.model('Notification', NotificationsSchema);