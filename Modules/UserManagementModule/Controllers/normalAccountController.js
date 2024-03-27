const asyncHanler = require('express-async-handler');
const Account = require('../Models/Account');
const Post = require('../../PostManagmentModule/Models/Post');
const Category = require('../../SystemMonitoringModule/Models/Category');
const paginate = require('../../../Common/pagination');

//@dec get theliked posts
//@route
//@access level 1
const getLikedPosts = asyncHanler( async(req, res) => {
    const {page, pageSize} = req.query;
    const account = Account.find({ownerId: req.user.id});
    const postIds = [...account.likedPosts];
    const filter = {_id: {$in: postIds}};
    const likedPosts = await paginate(Post, page, pageSize, filter);
    res.status(200).json(likedPosts);
});

//@dec get the liked posts
//@route
//@access level 1
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
//@access level 1
const getPreviousPostes = asyncHandler( async(req, res) => {
    const {page, pageSize} = req.query;
    const account = Account.find({owerId: req.user.id});
    if(!account || !account.previousPosts){
        res.status();
        throw new Error('The are no followings!');
    }
    const previousPosts = [...account.followings];
    const filter = {_id: {$in: previousPosts}};
    const posts = await paginate(Post, page, pageSize, filter);
    res.status(200).json(posts);
});

//@dec get user followings
//@route
//@access level 1
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