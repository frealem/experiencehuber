const Post = require('../Models/Post');
const PostPreview = require('../Models/PostPreview');
const Account = require('../../UserManagementModule/Models/Account');
const Category = require('../../SystemMonitoringModule/Models/Category');
const paginate = require('../../../Common/pagination');

//@desc get posts by people prefrence
//@route 
//@access level 1
const getPostsByPreference = asyncHanler(async (req, res) => {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize); 

    const account = await Account.findById(req.user.id);
    const ids = [...account.preferedCategories];
    const categories = await Category.find().where(_id).in(ids).exec();
    const categoryIds = categories.map(category => category._id);
    const filter = {categoryId: {$in : categoryIds }, special: false};

    const posts = await paginate(Post, page, pageSize, filter);

    res.status(200).json(posts);
});

//@desc get posts by search query
//@route 
//@access level 1
const getPostsByQuery = asyncHanler(async (req, res) => {
    const { page, pageSize, search } = req.query;
    const filter = {
       $text: { $search: search },
    };

    const posts = await paginate(Post, page, pageSize, filter);
    res.status(200).json(posts);
});

//@desc get posts by filter
//@route 
//@access level 1
const getPostsByFilter = asyncHanler(async (req, res) => {
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
//@route 
//@access public
const getSpecialPosts = asyncHanler(async (req, res) => {
    const {page, pageSize} = req.query;
    const filter = {special: true};

    const posts = await paginate(Post, page, pageSize, filter);
    res.status(200).json(posts);
});

//@desc get non posts by date(latest)
//@route 
//@access public
const getLatestPosts = asyncHanler(async (req, res) => {
    const {page, pageSize} = req.query;
    const filter = {};

    const posts = await paginate(Post, page, pageSize, filter);
    res.status(200).json(posts);
});

module.exports = {getPostsByFilter, getPostsByPreference, getPostsByQuery}