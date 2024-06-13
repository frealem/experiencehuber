const PostReview = require('../Models/PostReview');
const asyncHandler = require('express-async-handler');
const paginate = require('../../../Common/pagination');
const Post = require('../Models/Post');

//@desc get all post reviews related to post
//@route GET /api/postreview/post/:id
//@access level 1
const getPostReviewsByPost = asyncHandler(async (res, req) => {
    const postReviews = await PostReview.find({postId: req.params.id});
    if(!postReview){
        res.status(404);
        throw new Error("Review does not exist!");
    }
    res.status(200).json(postReviews);
});

//@desc get one post review
//@route GET /api/postreview/:id
//@access level 1
const getPostPreview = asyncHandler(async (req, res) => {
    const postReview = await PostReview.findOne({_id: req.params.id});
    if(!postReview){
        res.status(404);
        throw new Error("Review does not exist!");
    }

    res.status(200).json(postReview);
})

//@desc create new post review and adds average to the post rating
//@route POST /api/postreview/
//@access level 1
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


//@desc get all posts created by the owner
//@route UPDATE /api/postreview/:id
//@access level 1
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

//@desc delete post review
//@route DELETE /api/postreview/:id
//@access level 1
const deletePostReview = asyncHandler(async (req, res) => {
    const postReview = await PostReview.find(req.params.id);
    if(!postReview){
        res.status(404);
        throw new Error("Review does not exist!");
    }

    await PostReview.findOneAndDelete(req.params.id);
    res.status(200).json(postReview);
})


module.exports = {getPostReviewsByPost, getPostPreview, createPostReviews, updatePostReview, deletePostReview};