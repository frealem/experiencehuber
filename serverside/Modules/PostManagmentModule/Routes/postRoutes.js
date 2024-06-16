const router = require('express').Router();
const {getPosts, getPostsByOwner, getPost, createPost, updatePost, deletePost, uploadPostImages,getPostsByCurrentUser} = require('../Controllers/postController');
const {getSpecialPosts,getLatestPosts, getPostsByFilter, getPostsByQuery,getPostsByPreference} = require('../Controllers/additionalPostController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');
const fileUploadHandler = require('../../../Middleware/fileUploadHandler');


router.use(validateTokenLevel1);
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);
router.route('/').post(createPost);
router.post('/uploadimages', fileUploadHandler.single('file'), uploadPostImages);



module.exports = router;