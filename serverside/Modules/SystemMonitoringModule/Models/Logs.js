const { timeStamp } = require('console');
const mongoose = require('mongoose');

const LogsSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    action:{
        type: String,
    }
},{
    timeStamp: true,
})