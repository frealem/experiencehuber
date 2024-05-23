const asyncHandler = require('express-async-handler');
const Account = require('../Models/Account');
const Post = require('../../PostManagmentModule/Models/Post');
const Category = require('../../SystemMonitoringModule/Models/Category');
const paginate = require('../../../Common/pagination');

//@dec get theliked posts
//@route GET
//@access level 1
const getLikedPosts = asyncHandler( async(req, res) => {
    const postId = req.params.id;
    const account = Account.findOne({ownerId: req.user.id});
    const postIds = [...account.likedPosts, postId];
    account.llikedPost = postIds;
    await Account.
    res.status(200).json(postId);
});

//@dec get the liked posts
//@route GET
//@access level 1
const getPreferedCategories = asyncHandler( async(req, res) => {    
    const account = Account.findOne({ownerId: req.user.id});
    if(!account || !account.preferedCategories){
        res.status(201);
        throw new Error('The categoriesare not found!');
    }
    const categories = [...account.preferedCategories];
    const preferedCategories = await Category.find().where('_id').in(categories).exec();
    res.status(200).json(preferedCategories);
});

//@dec get previousposted posts
//@route GET
//@access level 1
const getPreviousPostes = asyncHandler( async(req, res) => {
    const {page, pageSize} = req.query;
    const account = Account.findOne({owerId: req.user.id});
    if(!account || !account.previousPosts){
        res.status();
        throw new Error('The are no followings!');
    }
    const previousPosts = [...account.followings];
    const filter = {_id: {$in: previousPosts}};
    const posts = await paginate(Post, page, pageSize, filter);
    res.status(200).json(posts);
});

//@desc get user followings
//@route GET
//@access level 1
const getFollwings = asyncHandler( async(req, res) => {
    const account = Account.findOne({ownerId: req.user.id});
    if(!account || !account.followings){
        res.status(404);
        throw new Error('The are no followings!');
    }
    const followings = [...account.followings];
    const followingAccounts = await Account.find().where('_id').in(followings).exec();
    res.status(200).json(followingAccounts);
});

//@desc check and like post
//@route POST api/acccount/like/:id
//@access level 1
const like = asyncHandler( async(req, res) => {
    const account = Account.findOne({ownerId: req.user.id});
    const likedPosts = [...account.likedPosts];
    if(likedPosts.includes(req.params.id)){
        res.status(200).json({res: false});
    }
    likedPosts.push(req.params.id);
    account.likedPosts = likedPosts;
    await account.save();
    res.status(200).json({res: true});
});


//@desc check and like post
//@route POST api/acccount/follow/:id
//@access level 1
const follow = asyncHandler( async(req, res) => {
    const account = Account.findOne({ownerId: req.user.id});
    const followings = [...account.followings];
    if(followings.includes(req.params.id)){
        res.status(404);
        throw new Error('The post is already liked');
    }
    followings.push(req.params.id);
    account.likedPosts = followings;
    await account.save();
});

//@desc check if the is liked
//@route GET api/acccount/isLiked/:id
//@access level 1
const isLiked = asyncHandler( async(req, res) => {
    const account = Account.findOne({ownerId: req.user.id});
    const likedPosts = [...account.likedPosts];
    if(likedPosts.includes(req.params.id)){
        res.status(200).json({res: true});
    }
    res.status(200).json({res: false});
});

module.exports = {getLikedPosts, 
                  getFollwings, 
                  getPreferedCategories, 
                  getPreviousPostes,
                  like,
                  follow,
                  isLiked
                };