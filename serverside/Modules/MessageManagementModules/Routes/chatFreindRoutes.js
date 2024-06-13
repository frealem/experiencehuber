const router = require('express').Router();
const {getChatFreinds, createChatFreind, deleteChatFreind} = require('../Controllers/chatFreindConroller')
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');
router.use(validateTokenLevel1);
router.route('/').post(createChatFreind).get(getChatFreinds);
router.route('/:id').delete(deleteChatFreind);
module.exports = router;