const express = require('express');
const router = express.Router();

// routes for user managmentsystem
//router leading to user router
router.use('/user', require('../Modules/UserManagementModule/Routes/userRoutes'));
//router leading to account router
router.use('/account', require('../Modules/UserManagementModule/Routes/accountRoutes'));
//router leading to admin router
router.use('/admin', require('../Modules/UserManagementModule/Routes/adminRoutes'));
//router leading to super admin router
router.use('/superadmin',require('../Modules/UserManagementModule/Routes/superAdminRoutes'))
//router leading to post router
router.use('/post', require('../Modules/PostManagmentModule/Routes/postRoutes'));
// routes for system monitoring
//router leading to role router
router.use('/role', require('../Modules/SystemMonitoringModule/Routes/roleRoutes'));

//router leading to post review controller
router.use('/postreview', require('../Modules/PostManagmentModule/Routes/postReviewRoutes'));
//router leading to post preview controller
router.use('/postpreview', require('../Modules/PostManagmentModule/Routes/postPreviewRoutes'));
//router leading to report routes
router.use('/report', require('../Modules/ReportManagementModule/Routes/reportRoutes'));
//router leading to messages
router.use('/message', require('../Modules/MessageManagementModules/Routes/messageRoute'));
//router leadin to chat freinds
router.use('/chatfreind', require('../Modules/MessageManagementModules/Routes/chatFreindRoutes')); 
//router leading to category controller
router.use('/category', require('../Modules/SystemMonitoringModule/Routes/categoryRoutes'));
//router leading to addition post controllers
router.use('/additional', require('../Modules/PostManagmentModule/Routes/additionalPostRoutes'));
//router leading to comment routes
router.use('/comment', require('../Modules/PostManagmentModule/Routes/commentRoutes'));
//router leading to system summeries
router.use('/system', require('../Modules/SystemMonitoringModule/Routes/systemRoutes'))
//router leading to notifications controllers
router.use('/notification', require('../Modules/UserManagementModule/Routes/notificationRoutes'))
//router leading to community guidelines
router.use('/guideline', require('../Modules/SystemMonitoringModule/Routes/communityGuidelineRoutes'))
//router leading to category page
router.use('/category', require('../Modules/SystemMonitoringModule/Routes/categoryRoutes'))
module.exports = router;