const router = require('express').Router();
const {validateTokenLevel3} = require('../../../Middleware/validateTokenHandler');
const {createAdmin,deleteAdmin, getAdmins} = require('../Controllers/superAdminAccountController');

router.use(validateTokenLevel3);
router.route('/admin').get(getAdmins).post(createAdmin);
router.route('/admin/:id').delete(deleteAdmin);

module.exports = router;