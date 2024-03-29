const router = require('express').Router();
const {getComments, 
       getComment, 
       createComment, 
       updateComment, 
       deleteComment} = require('../Controllers/commentController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');


router.get('/', getComments);
router.post('/', validateTokenLevel1, createComment);
router.put('/:id', validateTokenLevel1, updateComment);
router.delete('/:id', validateTokenLevel1, deleteComment);

module.exports = router;