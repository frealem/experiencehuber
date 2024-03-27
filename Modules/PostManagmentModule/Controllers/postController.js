const asyncHanler = require('expres-async-handler');
const Post = require('../Models/Post');
const History = require('../../SystemMonitoringModule/Models/History');

//@desc get all posts created by the owner
//@route 
//@access level 2
const getPosts = asyncHanler(async (req, res) => {
    const post = await Post.find();
    res.status(200).json(post);
});



//@desc get all posts craeted by the owner
//@route 
//@access level 1
const getPostsByOwner = asyncHanler(async (req, res) => {
    const post = await Post.find({ownerId: req.params.id});
    res.status(200).json(post);
});

//@desc get a post by id
//@route 
//@access public
const getPost = asyncHanler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(404);
        throw new Error("Post not found!");
    }
    await History.create({userId: req.user.id, postId: req.params.id});    
    res.status(200).json(post);
});

//@desc create new post
//@route 
//@access level 1
const createPost = asyncHanler(async (req, res) => {
    const {posterId, 
           title, 
           description, 
           like, 
           dislike, 
           share , 
           rating, 
           imageURL,
           tags,
           location,} = req.body;
    if(!posterId || !title || !description){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    const post = await Post.create({
           posterId, 
           title, 
           description, 
           like, 
           dislike, 
           share, 
           rating, 
           imageURL,
           tags,
           location,
    });
    res.status(200).json(post);
});

//@desc update a post
//@route 
//@access level 1
const updatePost = asyncHanler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(404);
        throw new Error("Post not ound");
    }

    const updatePost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatePost);
});

//@desc delete a post
//@route 
//@access level 1
const deletePost = asyncHanler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(404);
        throw new Error("Post not found");
    }

    await Post.findByIdAndRemove(req.params.id);
    res.status(200).json(Post);
});



module.exports = {getPosts, getPost, createPost, updatePost, deletePost, getPostsByOwner};