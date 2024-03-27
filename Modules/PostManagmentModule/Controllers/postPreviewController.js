const PostPreview = require('../Models/PostPreviewPreview');


//@desc get all postpreviews created by the owner
//@route 
//@access level 2
const getPostPreviews = asyncHanler(async (req, res) => {
    const postpreview = await PostPreview.find({ownerId: req.user.id});
    res.status(200).json(postpreview);
});

//@desc get a postpreview by id
//@route 
//@access public
const getPostPreview = asyncHanler(async (req, res) => {
    const postpreview = await PostPreview.findById(req.params.id);
    if(!postpreview){
        res.status(404);
        throw new Error("PostPreview not found!");
    }    
    res.status(200).json(postpreview);
});

//@desc create new postpreview
//@route 
//@access level 1
const createPostPreview = asyncHanler(async (req, res) => {
    const {posterId, 
           title, 
           description, 
           rating, 
           imageURL,
           tags,
           location,} = req.body;
    if(!posterId || !title || !description){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    if((await PostPreview.countDocuments({posterId: req.user.id})) > 5){
        res.status(400);
        throw new Error("User cannot create Post previews more than 5!");
    }
    const postpreview = await PostPreview.create({
           posterId, 
           title, 
           description,  
           rating, 
           imageURL,
           tags,
           location,
    });
    res.status(200).json(postpreview);
});

//@desc update a postpreview
//@route 
//@access level 1
const updatePostPreview = asyncHanler(async (req, res) => {
    const postpreview = await PostPreview.findById(req.params.id);
    if(!postpreview){
        res.status(404);
        throw new Error("PostPreview not ound");
    }

    const updatePostPreview = await PostPreview.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatePostPreview);
});

//@desc delete a postpreview
//@route 
//@access level 1
const deletePostPreview = asyncHanler(async (req, res) => {
    const postpreview = await PostPreview.findById(req.params.id);
    if(!postpreview){
        res.status(404);
        throw new Error("PostPreview not found");
    }

    await PostPreview.findByIdAndRemove(req.params.id);
    res.status(200).json(PostPreview);
});

module.exports = {getPostPreviews, getPostPreview, createPostPreview, deletePostPreview, updatePostPreview};