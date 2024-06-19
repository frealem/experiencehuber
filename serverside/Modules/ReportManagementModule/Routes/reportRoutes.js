const router = require('express').Router();
const {getReports,getReport,createReport, deleteReport, updateReport} = require('../Controllers/reportController');
const {validateTokenLevel1, validateTokenLevel2} = require('../../../Middleware/validateTokenHandler');

router.get('/', validateTokenLevel2, getReports);
router.post('/', validateTokenLevel1, createReport);
router.get('/:id', validateTokenLevel2, getReport);
router.put('/:id', validateTokenLevel2, updateReport);
router.delete('/:id', validateTokenLevel2, deleteReport);

module.exports = router;