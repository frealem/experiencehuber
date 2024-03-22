const asyncHandler = require('express-async-handler');
const User = require('../Models/User');

//@desc get all users
//@route 
//@accesslevel 2
const getUsers = asyncHandler(async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
});

module.exports = {getUsers}