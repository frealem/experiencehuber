const router = require('express').Router();
const {getMessages, getMessage, createMessage, updateMessage, deleteMessage} = require('../Controllers/messageController')
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');

router.use(validateTokenLevel1);
router.route('/:id').get(getMessage).put(updateMessage).delete(deleteMessage);
router.route('/').post(createMessage);
router.route('/messages/:id').get(getMessages);

module.exports = router;