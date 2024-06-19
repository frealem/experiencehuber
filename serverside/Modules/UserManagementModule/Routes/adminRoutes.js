const router = require('express').Router();
const {getUsers, getSystemSummary, deletePost} = require('../Controllers/adminAccountController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');

router.use(validateTokenLevel1);

router.route('/users').get(getUsers);
router.route('/system').get(getSystemSummary);
router.route('/deletepost/:id').delete(deletePost)

module.exports = router;