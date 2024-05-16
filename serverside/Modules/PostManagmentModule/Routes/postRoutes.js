const router = require('express').Router();
const {getPostsByOwner, getPost, createPost, updatePost, deletePost} = require('../Controllers/postController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');
const fileUploadHandler = require('../../../Middleware/fileUploadHandler');


router.use(validateTokenLevel1);
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);
router.post('/', fileUploadHandler.array('avatar[]'), createPost)

module.exports = router;