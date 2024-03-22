const router = require('express').Router();
const {validateTokenLevel1, validateTokenLevel2} = require('../../../Middleware/validateTokenHandler');
const {getCurrentUser, 
       updateUser, 
       deleteUser, 
       registerUser, 
       loginUser } = require('../Controllers/userController');

router.get('/',validateTokenLevel2, getUsers);       
router.get('/',validateTokenLevel1, getCurrentUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
module.exports = router;