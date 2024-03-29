const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "please enter category name"],
    },
    description: {
        type: String,
        required: [true, "please enter category description"],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model('Category', CategorySchema);