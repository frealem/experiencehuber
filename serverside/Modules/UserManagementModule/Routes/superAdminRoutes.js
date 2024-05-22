const router = require('express').Router();
const {validateTokenLevel3} = require('../../../Middleware/validateTokenHandler');
const {createAdmin,deleteAdmin} = require('../Controllers/superAdminAccountController');

//router.use(validateTokenLevel3);
router.route('/admin/').post(createAdmin);
router.route('/admin/:id').delete(deleteAdmin);

module.exports = router;