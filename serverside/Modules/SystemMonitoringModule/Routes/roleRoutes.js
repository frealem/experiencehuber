const router = require('express').Router();
const {validateTokenLevel2} = require('../../../Middleware/validateTokenHandler');
const{getRoles, 
      getRole, 
      createRole, 
      updateRole, 
      deleteRole} = require('../Controllers/roleController');

router.use(validateTokenLevel2);
      
router.route('/').get(getRoles).post(createRole);
router.route('/:id').get(getRole).put(updateRole).delete(deleteRole);


module.exports = router;