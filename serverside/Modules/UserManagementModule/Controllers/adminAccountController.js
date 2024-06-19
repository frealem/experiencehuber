const asyncHandler = require('express-async-handler');
const User = require('../Models/User');
const Post = require('../../PostManagmentModule/Models/Post');
const Report = require('../../ReportManagementModule/Models/Report');
const Role = require('../../SystemMonitoringModule/Models/Role');
const CommunityGuideLine = require('../../SystemMonitoringModule/Models/CommunityGuideLine');
const Notifications = require('../Models/Notifications')
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
    res.status(200).json(users);
});

//@desc get all users
//@route GET api/user/system/
//@accesslevel 2
const getSystemSummary = asyncHandler(async (req, res) => {
    
});


//@desc get all users
//@route GET api/user/system/
//@accesslevel 2
const deletePost = asyncHandler(async(req, res) => {
    try {
        const report = await Report.findOne({_id:req.params.id});
    const post = await Post.findOne({_id: report.postId});
    const guidline = await CommunityGuideLine.findOne({_id: report.reportCase})
    const userId = post.postrtId;
    await Post.findOneAndDelete({_id: post._id});
    // await Notifications.create({
    //     userId: userId,
    //     title: "Post has been deleted by admin",
    //     detail: `Post with title ${post.title} has been deleted due to violation of community guidline ${guidline.name}`
    // })
    report.status = 3;
    await report.save();
    res.status(200).json()
    } catch (error) {
        res.status(404)
        throw new Error("Error occured while deleting post")
    }   
});

module.exports = {getUsers, getSystemSummary, deletePost}