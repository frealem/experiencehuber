const router = require('express').Router();
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');
const {getPostPreviews, getPostPreview, createPostPreview, updatePostPreview, deletePostPreview} = require('../Controllers/postPreviewController');

router.use(validateTokenLevel1);

router.route('/').get(getPostPreviews).post(createPostPreview);
router.route('/:id').get(getPostPreview).put(updatePostPreview).delete(deletePostPreview);

module.exports = router;

