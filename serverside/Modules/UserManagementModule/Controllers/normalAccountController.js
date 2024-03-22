const asyncHanler = require('express-async-handler');
const Account = require('../Models/Account');
const Post = require('../../PostManagmentModule/Models/Post');
const Category = require('../../SystemMonitoringModule/Models/Category');

//@dec get theliked posts
//@route
//@access
const getLikedPosts = asyncHanler( async(req, res) => {
    const account = Account.find({ownerId: req.user.id});
    const postIds = [...account.likedPosts];
    const likedPosts = await Post.find.where('_id').in(postIds).exec();
    res.status(200).json(likedPosts);
});

//@dec get the liked posts
//@route
//@access
const getPreferedCategories = asyncHanler( async(req, res) => {
    const account = Account.find({ownerId: req.user.id});
    if(!account || !account.preferedCategories){
        res.status(201);
        throw new Error('The categoriesare not found!');
    }
    const categories = [...account.preferedCategories];
    const preferedCategories = await Category.find().where('_id').in(categories).exec();
    res.status(200).json(preferedCategories);
});

//@dec get previousposted posts
//@route
//@access
const getPreviousPostes = asyncHandler( async(req, res) => {
    const account = Account.find({owerId: req.user.id});
    if(!account || !account.previousPosts){
        res.status();
        throw new Error('The are no followings!');
    }
    const previousPosts = [...account.followings];
    const posts = await Account.find().where('_id').in(previousPosts).exec();
    res.status(200).json(posts);
});

//@dec get user followings
//@route
//@access
const getFollwings = asyncHandler( async(req, res) => {
    const account = Account.find({owerId: req.user.id});
    if(!account || !account.followings){
        res.status();
        throw new Error('The are no followings!');
    }
    const followings = [...account.followings];
    const followingAccounts = await Account.find().where('_id').in(followings).exec();
    res.status(200).json(followingAccounts);
});


module.exports = {getLikedPosts};