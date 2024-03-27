const asyncHandler = require('express-async-handler');
const User = require('../Models/User');
const Post = require('../../PostManagmentModule/Models/Post');
const Report = require('../../ReportManagementModule/Models/Report');

//@desc get all users
//@route GET api/user/users
//@accesslevel 2
const getUsers = asyncHandler(async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
});

//@desc get all users
//@route GET api/user/system/
//@accesslevel 2
const getSystemSummary = asyncHandler(async (req, res) => {
    
});

module.exports = {getUsers, getSystemSummary}