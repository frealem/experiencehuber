const Post = require('../Models/Post');
const PostPreview = require('../Models/PostPreview');
const Account = require('../../UserManagementModule/Models/Account');
const Category = require('../../SystemMonitoringModule/Models/Category');
const paginate = require('../../../Common/pagination');
const paginateWithNoFilter = require('../../../Common/paginationWithNoFilter');
const asyncHandler = require('express-async-handler');
const History = require('../../SystemMonitoringModule/Models/History')




//@desc get all posts craeted by the owner
//@route GET /api/post/current/:id
//@access level 1
const getPostsByCurrentUser = asyncHandler(async (req, res) => {
    const post = await Post.find({posterId: req.user.id}) .sort({createdAt: 'desc'});
    console.log(post)
    if(!post){
        res.status(404);
        throw new Error('posts not found')
    }
    res.status(200).json(post);
});
//@desc get posts by people prefrence
//@route GET /api/post/preference
//@access level 1
const getPostsByPreference = asyncHandler(async (req, res) => {
    // const page = parseInt(req.query.page);
    // const pageSize = parseInt(req.query.pageSize); 
    const page = 1;
    const pageSize = 100;
    const account = await Account.findOne({ownerId: req.user.id});
    const ids = [...account.preferedCategories];
    const history = await History.find({userId: req.user.id}).limit(2);
    // const categories = await Category.find().where(_id).in(ids).exec();
    // const categoryIds = categories.map(category => category._id);
    let filter = {};
    if(ids && ids.length > 0){
        filter = {_id: {$nin: history},categoryId: {$in : ids }, special: false};
    }else{
        filter = {_id: {$nin: history}, special: false}
    }
    

    const posts = await paginate(Post, page, pageSize, filter);
    console.log(posts);
    res.status(200).json(posts);
});

//@desc get posts by search query
//@route GET /api/post/query
//@access level 1
const getPostsByQuery = asyncHandler(async (req, res) => {
    console.log('res')
    const { page, pageSize, search } = req.query;
    console.log(search)
    const filter = {
       $text: { $search: search },
    };

    const posts = await paginate(Post, page, pageSize, filter);
    res.status(200).json(posts);
});

//@desc get posts by filter
//@route GET /api/post/filter
//@access level 1
const getPostsByFilter = asyncHandler(async (req, res) => {
    const {page, pageSize, tags, categories, ratings} = req.query;
    const filter = {
        categoryId: {$in: categories},
        rating: {$gte: ratings},
    };

    const posts = await paginate(Post, page, pageSize, filter);
    res.status(200).json(posts);
});

//@desc get special posts by date(latest)
//@route GET /api/post/special
//@access public
const getSpecialPosts = asyncHandler(async (req, res) => {
    const {page, pageSize} = req.query;
    const filter = {special: true};

    const posts = await paginate(Post, page, pageSize, filter);
    res.status(200).json(posts);
});

//@desc get non special posts by date(latest)
//@route GET /api/post/special
//@access public
const getLatestPosts = asyncHandler(async (req, res) => {
    console.log(req.body);
    //const {page, pageSize} = req.body.query;
    const page = 1;
    const pageSize = 20
    const filter = {};
    console.log("hello");
    const posts = await paginateWithNoFilter(Post, page, pageSize);
    //const posts = await Post.find();
    console.log(posts)
    res.status(200).json(posts);
});

module.exports = {getPostsByFilter, getPostsByPreference, getPostsByQuery, getLatestPosts, getSpecialPosts, getPostsByCurrentUser}