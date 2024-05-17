const router = require('express').Router();
const {getPosts, getPostsByOwner, getPost, createPost, updatePost, deletePost} = require('../Controllers/postController');
const {getSpecialPosts,getLatestPosts, getPostsByFilter, getPostsByQuery,getPostsByPreference} = require('../Controllers/additionalPostController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');
const fileUploadHandler = require('../../../Middleware/fileUploadHandler');


router.use(validateTokenLevel1);
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);
router.post('/', fileUploadHandler.array('avatar[]'), createPost);
router.get('/all',getPosts);
router.get('/latest',getLatestPosts);
router.get('/preference',getPostsByPreference);
router.get('/filter',getPostsByFilter);
router.get('/query', getPostsByQuery);
router.get('/special', getSpecialPosts);
router.get('/owner/:id', getPostsByOwner);

module.exports = router;