const express = require('express');
const router = express.Router();

// routes for user managmentsystem
//router leading to user router
router.use('/user', require('../Modules/UserManagementModule/Routes/userRoutes'));
//router leading to account router
router.use('/acount', require('../Modules/UserManagementModule/Routes/accountRoutes'));
//router leading to admin router
router.use('/admin', require('../Modules/UserManagementModule/Routes/adminRoutes'));

// routes for system monitoring
//router leading to role router
router.use('/role', require('../Modules/SystemMonitoringModule/Routes/roleRoutes'));

module.exports = router;