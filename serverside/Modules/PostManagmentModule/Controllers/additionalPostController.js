const Post = require('../Models/Post');
const PostPreview = require('../Models/PostPreview');
const Account = require('../../UserManagementModule/Models/Account');
const Category = require('../../SystemMonitoringModule/Models/Category');
const paginate = require('../../../Common/pagination');
const asyncHandler = require('express-async-handler');

//@desc get posts by people prefrence
//@route GET /api/post/preference
//@access level 1
const getPostsByPreference = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize); 

    const account = await Account.findById(req.user.id);
    const ids = [...account.preferedCategories];
    const history = await History.find({userId: req.user.id}).limit(100);
    // const categories = await Category.find().where(_id).in(ids).exec();
    // const categoryIds = categories.map(category => category._id);
    const filter = {_id: {$nin: history},categoryId: {$in : ids }, special: false};

    const posts = await paginate(Post, page, pageSize, filter);

    res.status(200).json(posts);
});

//@desc get posts by search query
//@route GET /api/post/query
//@access level 1
const getPostsByQuery = asyncHandler(async (req, res) => {
    const { page, pageSize, search } = req.query;
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
        tags: {$in: tags},
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
    const {page, pageSize} = req.query;
    const filter = {};

    const posts = await paginate(Post, page, pageSize, filter);
    res.status(200).json(posts);
});

module.exports = {getPostsByFilter, getPostsByPreference, getPostsByQuery, getLatestPosts, getSpecialPosts}