const router = require('express').Router();
const {validateTokenLevel2} = require('../../../Middleware/validateTokenHandler');
const {getCategories, 
       getCategory, 
       createCategory, 
       updateCategory, 
       deleteCategory} = require('../Controllers/categoryController');

// //router.use(validateTokenLevel2);
// router.route('/').get(getCategories).post(createCategory);
// router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);

module.exports = router;