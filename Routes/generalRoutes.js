const express = require('express');
const router = express.Router();

//router leaading to user router
router.use('/user', require('../Modules/UserManagementModule/Routes/userRoutes'));

//router leading to role router
router.use('/role', require('../Modules/SystemMonitoringModule/Routes/roleRoutes'));

module.exports = router;