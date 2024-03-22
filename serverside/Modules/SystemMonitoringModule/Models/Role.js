const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "please enter category name!"],
    },
    description: {
        type: String,
        required: [true, "please enter category description!"],
    },
    accessLevel: {
        type: Number,
        required: [true, "please enter access level!"]
    }
});

module.exports = mongoose.model('Role', RoleSchema);