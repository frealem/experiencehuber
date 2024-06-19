const router = require('express').Router();
const {validateTokenLevel2, validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');
const {getCategories, 
       getCategory, 
       createCategory, 
       updateCategory, 
       deleteCategory} = require('../Controllers/categoryController');

//router.use(validateTokenLevel2);
router.get('/', validateTokenLevel1, getCategories);
router.get('/:id', validateTokenLevel2, getCategory);
router.post('/', validateTokenLevel2, createCategory);
router.put('/:id', validateTokenLevel2, updateCategory);
router.delete('/:id', validateTokenLevel2, deleteCategory);

module.exports = router;