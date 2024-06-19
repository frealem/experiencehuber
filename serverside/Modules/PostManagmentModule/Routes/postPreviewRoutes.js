const router = require('express').Router();
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');
const {getPostPreviews, getPostPreview, createPostPreview, updatePostPreview, deletePostPreview} = require('../Controllers/postPreviewController');
const fileUploadHandler = require('../../../Middleware/fileUploadHandler');

router.use(validateTokenLevel1);

router.route('/').get(getPostPreviews);
router.route('/:id').get(getPostPreview).put(updatePostPreview).delete(deletePostPreview);
router.post('/', createPostPreview)

module.exports = router;

