const router = require('express').Router()
const {getSystemSummary} = require('../Controllers/systemController');
const { route } = require('./roleRoutes');
router.route('/:id').get(getSystemSummary);

module.exports = router;