const router = require('express').Router();
const {getNotification, createNotification, deleteNotification, getNotifications} = require('../Controllers/notificationController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');

router.use(validateTokenLevel1);
router.route('/').get(getNotifications).post(createNotification);
router.route('/:id').get(getNotification).delete(deleteNotification);

module.exports = router;