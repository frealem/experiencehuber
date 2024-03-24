const Post = require('../Models/Post');
const PostPreview = require('../Models/PostPreview');
const Account = require('../../UserManagementModule/Models/Account');
const Category = require('../../SystemMonitoringModule/Models/Category');

//@desc get posts by people prefrence
//@route 
//@access level 1
const getPostsByPreference = asyncHanler(async (req, res) => {
    const account = Account.find(req.user.id);
    const categories = Category.find(); 
    res.status(200).json(post);
});

//@desc get posts by search query
//@route 
//@access level 1
const getPostsByQuery = asyncHanler(async (req, res) => {
    const post = Post.find(); 
    res.status(200).json(post);
});

//@desc get posts by filter
//@route 
//@access level 1
const getPostsByFilter = asyncHanler(async (req, res) => {
    const post = Post.find(); 
    res.status(200).json(post);
});

module.exports = {getPostsByFilter, getPostsByPreference, getPostsByQuery}