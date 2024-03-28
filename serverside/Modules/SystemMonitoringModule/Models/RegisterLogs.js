const mongoose = require('mongoose');

const RegisterLogsSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('RegisterLogs', RegisterLogsSchema);