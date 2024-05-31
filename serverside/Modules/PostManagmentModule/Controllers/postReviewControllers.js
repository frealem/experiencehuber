const PostReview = require('../Models/PostReview');
const asyncHandler = require('express-async-handler');
const paginate = require('../../../Common/pagination');
const Post = require('../Models/Post');


const getPostReviewsByPost = asyncHandler(async (res, req) => {
    const postReviews = await PostReview.find({postId: req.params.id});
    if(!postReview){
        res.status(404);
        throw new Error("Review does not exist!");
    }
    res.status(200).json(postReviews);
});

const getPostPreview = asyncHandler(async (req, res) => {
    const postReview = await PostReview.findOne({_id: req.params.id});
    if(!postReview){
        res.status(404);
        throw new Error("Review does not exist!");
    }

    res.status(200).json(postReview);
})

const createPostReviews = asyncHandler(async (req, res) => {
    const post = await Post.findOne({_id: req.body.psotId});

    if(!post){
        res.status(404);
        throw new Error("Post is not found");
    }
    const posterId = req.user.id;
    const {
        postId,
        description,
        rate
    } = req.body;

    if(!posterId || !description || !postId || !rate){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }

    const createdPostReview = await PostReview.create({
        posterId,
        postId,
        description,
        rate,
    });
    let aveRate = post.rate;
    aveRate = (aveRate + rate)/2;

    post.rate = aveRate;
    const updatedPost = await post.save();

    res.status(200).json(createPostReviews);
}); 

const updatePostReview = asyncHandler(async (req, res) => {
    const postReview = await PostReview.find(req.params.id);
    if(!postReview){
        res.status(404);
        throw new Error("Review does not exist!");
    }

    const updatedPostReview = PostReview.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatePostReview);
});


const deletePostReview = asyncHandler(async (req, res) => {
    const postReview = await PostReview.find(req.params.id);
    if(!postReview){
        res.status(404);
        throw new Error("Review does not exist!");
    }

    await PostReview.findByIdAndDelete(req.params.id);
    res.status(200).json(postReview);
})


module.exports = {getPostReviewsByPost, getPostPreview, createPostReviews, updatePostReview, deletePostReview};