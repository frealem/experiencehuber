const router = require('express').Router();
const {getComments, 
       getComment, 
       createComment, 
       updateComment, 
       deleteComment} = require('../Controllers/commentController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');


router.route('/').post(createComment);
router.route('/').put(updateComment).delete(deleteComment);

module.exports = router;