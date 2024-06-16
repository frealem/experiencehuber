const mongoose = require('mongoose')

const LastCoutnSchema = mongoose.Schema({
    userCount: Number,
    postCount: Number,
})

module.exports = mongoose.model('LastCount', LastCoutnSchema);