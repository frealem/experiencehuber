const asyncHandler = require('express-async-handler');
const Account = require('../Models/Account');
const User = require('../Models/User');
const Post = require('../../PostManagmentModule/Models/Post');
const Category = require('../../SystemMonitoringModule/Models/Category');
const paginate = require('../../../Common/pagination');
const mongoose = require('mongoose');
const Like = require('../../SystemMonitoringModule/Models/Like');

//@dec get theliked posts
//@route GET
//@access level 1
const getLikedPosts = asyncHandler( async(req, res) => {
    console.log("hello")
    const account = await Account.findOne({ownerId: req.user.id});
    console.log(account);
    const postIds = [...account.likedPosts];
    const posts = await Post.find({_id: {$in: postIds}})
    if(!posts){
        res.status(404);
        throw new Error("Posts not found");
    }
    res.status(200).json(posts);
});

//@dec get the liked posts
//@route GET
//@access level 1
const getPreferedCategories = asyncHandler( async(req, res) => {    
    const account = await Account.findOne({ownerId: req.user.id});
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
    const account = await Account.findOne({owerId: req.user.id});
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
//@route GET api/account/getfollowings
//@access level 1
const getFollowings = asyncHandler( async(req, res) => {
    console.log("reached here")
    console.log(req.user.id);
    const account = await Account.findOne({ownerId: req.user.id});
    if(!account || !account.followings){
        res.status(404);
        throw new Error('The are no followings!');
    }
    console.log(account)
    const followings = [...account.followings];
    const followingUsers = await User.find().where('_id').in(followings).exec();
    res.status(200).json(followingUsers);
});

//@desc check and like post
//@route POST api/acccount/like/:id
//@access level 1
const like = asyncHandler(async (req, res) => {
    const postIdString = req.params.id;
    const post = await Post.findOne({ _id: postIdString });
    const account = await Account.findOne({ ownerId: req.user.id });
    const likedPosts = [...account.likedPosts];
    if (!post || !account) {
      res.status(404);
      throw new Error('Error');
    }
    const postId = new mongoose.Types.ObjectId(postIdString);
    if (likedPosts.some((postObjectId) => postObjectId.equals(postId))) {
      const newList = likedPosts.filter((item) => !item.equals(postId));
      account.likedPosts = newList;
      await account.save();
      if (!post.like) {
        post.like = 0;
      } else {
        post.like = post.like - 1;
      }
      await post.save();
      res.status(200).json({ res: false, like: post.like });
    } else {
      likedPosts.push(postId);
      account.likedPosts = likedPosts;
      if (!post.like) {
        post.like = 1;
      } else {
        post.like = post.like + 1;
      }
      await account.save();
      await post.save();
      await Like.create({
        userId: req.user.id,
        postId: req.params.id
      })
      res.status(200).json({ res: true, like: post.like });
    }
  });


//@desc check and like post
//@route POST api/acccount/follow/:id
//@access level 1
const follow = asyncHandler( async(req, res) => {
    const account = await Account.findOne({ownerId: req.user.id});
    const followings = [...account.followings];
    const userId = new mongoose.Types.ObjectId(req.params.id);
    if(followings.some((item)=> item.equals(userId))){
        res.status(404);
        throw new Error('The post is already liked');
    }
    followings.push(req.params.id);
    account.followings = followings;
    await account.save();
});

//@desc check if the is liked
//@route GET api/acccount/isLiked/:id
//@access level 1
const isLiked = asyncHandler( async(req, res) => {
    const account = await Account.findOne({ownerId: req.user.id});
    console.log(account)
    if(!account || !account.likedPosts){
        console.log("hello");
        res.status(200).json({res: false});
        return;
    }
    const likedPosts = [...account.likedPosts];
    console.log(req.params.id)
    console.log(likedPosts)
    const postId = new mongoose.Types.ObjectId(req.params.id);
    if (likedPosts.some(postObjectId => postObjectId.equals(postId))) {
      res.status(200).json({ res: true });
      return;
    }
    res.status(200).json({res: false});
});

module.exports = {getLikedPosts, 
                  getFollowings, 
                  getPreferedCategories, 
                  getPreviousPostes,
                  like,
                  follow,
                  isLiked
                };