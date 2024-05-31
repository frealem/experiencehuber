const router = require('express').Router();
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');
const {getPostPreview,
       getPostReviewsByPost,
       createPostReviews,
       updatePostReview,
       deletePostReview
    } = require('../Controllers/postReviewControllers');

router.use(validateTokenLevel1);
router.route('/').post(createPostReviews);
router.route('/:id').get(getPostPreview).put(updatePostReview).delete(deletePostReview);
router.route('/post/:id').get(getPostReviewsByPost);

module.exports = router;