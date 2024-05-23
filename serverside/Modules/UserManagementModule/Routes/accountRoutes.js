const router = require('express').Router();
const {getAccounts, getAccount, createAccount, deleteAccount, updateAccount} = require('../Controllers/accountController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');

//router.use(validateTokenLevel1);
router.route('/').get(getAccounts).post(createAccount);
router.route('/:id').get(getAccount).put(updateAccount).delete(deleteAccount);


module.exports = router;