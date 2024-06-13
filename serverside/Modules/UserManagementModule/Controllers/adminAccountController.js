const asyncHandler = require('express-async-handler');
const User = require('../Models/User');
const Post = require('../../PostManagmentModule/Models/Post');
const Report = require('../../ReportManagementModule/Models/Report');
const Role = require('../../SystemMonitoringModule/Models/Role');

//@desc get all users
//@route GET api/user/users
//@accesslevel 2
const getUsers = asyncHandler(async (req, res) => {
    const role = await Role.findOne({accessLevel: 1});
    console.log(role);
    const users = await User.find({role: role._id});
    if(!users){
        res.status(404);
        throw new Error("user not found");
    }
    console.log(users);
    res.status(200).json(users);
});

//@desc get all users
//@route GET api/user/system/
//@accesslevel 2
const getSystemSummary = asyncHandler(async (req, res) => {
    
});

module.exports = {getUsers, getSystemSummary}