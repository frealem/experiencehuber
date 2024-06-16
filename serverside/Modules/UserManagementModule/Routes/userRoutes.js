const router = require('express').Router();
const {validateTokenLevel1, validateTokenLevel3} = require('../../../Middleware/validateTokenHandler');
const fileUploadHandler = require('../../../Middleware/fileUploadHandler');
const {getCurrentUser,
       getUser, 
       updateUser, 
       deleteUser, 
       registerUser, 
       loginUser,
       changeProfilePicture,
       changePassword
} = require('../Controllers/userController');
     
router.get('/' ,validateTokenLevel1, getCurrentUser);
router.get('/:id',validateTokenLevel1, getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changePP', validateTokenLevel1, fileUploadHandler.single('file'), changeProfilePicture);
router.post('/changepassword', validateTokenLevel1, changePassword);
module.exports = router;