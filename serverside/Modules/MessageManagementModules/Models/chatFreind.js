const mongoose = require('mongoose')


const chatFreindSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    freindId:{
        type: mongoose.Types.ObjectId,
        ref: 'Uesr'
    } 
},{
    timestamps: true
})

module.exports = mongoose.model('ChatFreind', chatFreindSchema);