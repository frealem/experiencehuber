const router = require('express').Router();
const {validateTokenLevel1, validateTokenLevel3} = require('../../../Middleware/validateTokenHandler');
const fileUploadHandler = require('../../../Middleware/fileUploadHandler');
const {getCurrentUser, 
       updateUser, 
       deleteUser, 
       registerUser, 
       loginUser,
       changeProfilePicture} = require('../Controllers/userController');
     
router.get('/' ,validateTokenLevel1, getCurrentUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changePP', validateTokenLevel3, fileUploadHandler.single('file'), changeProfilePicture);
module.exports = router;