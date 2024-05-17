const express = require('express');
const router = express.Router();

// routes for user managmentsystem
//router leading to user router
router.use('/user', require('../Modules/UserManagementModule/Routes/userRoutes'));
//router leading to account router
router.use('/acount', require('../Modules/UserManagementModule/Routes/accountRoutes'));
//router leading to admin router
router.use('/admin', require('../Modules/UserManagementModule/Routes/adminRoutes'));
//router leading to super admin router
//router.use('/superadmin',require('../Modules/UserManagementModule/Routes/superAdminRoutes'))
//router leading to post router
router.use('/post', require('../Modules/PostManagmentModule/Routes/postRoutes'));
// routes for system monitoring
//router leading to role router
router.use('/role', require('../Modules/SystemMonitoringModule/Routes/roleRoutes'));

module.exports = router;