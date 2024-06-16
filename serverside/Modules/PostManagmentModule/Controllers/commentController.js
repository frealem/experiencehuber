const asyncHanler = require('express-async-handler');
const Comment = require('../Models/Comment');


//@desc get all comments
//@route 
//@access public
const getComments = asyncHanler(async (req, res) => {
    const comment = await Comment.find({postId: req.params.id});
    res.status(200).json(comment);
});

//@desc get a comment by id
//@route 
//@access public
const getComment = asyncHanler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        res.status(404);
        throw new Error("Comment not found!");
    }
    res.status(200).json(comment);
});

//@desc create new comment
//@route 
//@access public
const createComment = asyncHanler(async (req, res) => {
    console.log("hello")
    const commeterId = req.user.id;
    const {content, postId} = req.body;
    if(!commeterId || !content || !postId){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    const comment = await Comment.create({
        commeterId, 
        content, 
        postId, 
    });
    res.status(200).json(comment);
});

//@desc update a comment
//@route 
//@access public
const updateComment = asyncHanler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        res.status(404);
        throw new Error("Comment not ound");
    }

    const updateComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updateComment);
});

//@desc delete a comment
//@route 
//@access public
const deleteComment = asyncHanler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        res.status(404);
        throw new Error("Comment not found");
    }

    await Comment.findOneAndDelete(req.params.id);
    res.status(200).json(Comment);
});



module.exports = {getComments, getComment, createComment, updateComment, deleteComment};