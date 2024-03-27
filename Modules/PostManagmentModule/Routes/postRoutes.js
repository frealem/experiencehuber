const router = require('express').Router();
const {getPostsByOwner, getPost, createPost, updatePost, deletePost} = require('../Controllers/postController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');

router.use(validateTokenLevel1);
router.route('/:id').get(getPost).put(updatePost).delete(deletePost);
router.route('/').post(createPost);

module.exports = router;