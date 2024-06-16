const asyncHanler = require('express-async-handler');
const Post = require('../Models/Post');
const History = require('../../SystemMonitoringModule/Models/History');
const Account = require('../../UserManagementModule/Models/Account')

//@desc get all posts created by the owner
//@route GET /api/post/all/
//@access level 2
const getPosts = asyncHanler(async (req, res) => {
    const post = await Post.find();
    res.status(200).json(post);
});



//@desc get all posts craeted by the owner
//@route GET /api/post/owner/:id
//@access level 1
const getPostsByOwner = asyncHanler(async (req, res) => {
    const post = await Post.find({posterId: req.params.id}).sort({createdAt: 'aesc'});
    res.status(200).json(post);
});


//@desc get a post by id
//@route GET /api/post/:id
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
//@route POST /api/post/
//@access level 1
const createPost = asyncHanler(async (req, res) => {
    const posterId = req.user.id;
    const {title, 
           description, 
           like = 0, 
           dislike = 0, 
           share = 0,
           special = false, 
           rating, 
           tags,
           location,
           imageURL
        } = req.body;
    console.log(imageURL);
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
           special, 
           imageURL,
           tags,
           location,
    });
    const account = await Account.findOne({ownerId: req.user.id});
    const previousPosts = [...account.previousPosts];
    previousPosts.push(post._id);
    account.previousPosts = previousPosts;
    const a = await account.save();
    console.log(a)
    res.status(200).json(post);
});

//@desc update a post
//@route UPDATE /api/post/:id
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
//@route DELETE /api/post/:id
//@access level 1
const deletePost = asyncHanler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(404);
        throw new Error("Post not found");
    }

    await Post.findOneAndDelete(req.params.id);
    res.status(200).json(Post);
});

const uploadPostImages = asyncHanler(async (req, res) => {
    // let imageURL = [];
    // if(!req.files){
    //     res.status(400);
    //     throw new Error("file not uploaded");
    // } 
    // let path = '';
    // req.files.forEach((file, index, arr) => {
    //         path = path + file.path;
    //         imageURL.push(path);
    // }); 
    console.log(req.file.fieldname);
    const imageUrl = req.file.filename;      
    res.status(200).json(imageUrl);
});


module.exports = {getPosts, getPost, createPost, updatePost, deletePost, getPostsByOwner, uploadPostImages};