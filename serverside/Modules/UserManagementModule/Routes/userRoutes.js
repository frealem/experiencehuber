const router = require('express').Router();
const {validateTokenLevel1, validateTokenLevel2} = require('../../../Middleware/validateTokenHandler');
const fileUploadHandler = require('../../../Middleware/fileUploadHandler');
const {getCurrentUser,
       getUser, 
       updateUser, 
       deleteUser, 
       registerUser, 
       loginUser,
       changeProfilePicture,
       changePassword,
       searchUser
} = require('../Controllers/userController');
     
router.get('/current' ,validateTokenLevel1, getCurrentUser);
router.get('/one/:id', getUser);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/changePP', validateTokenLevel1, fileUploadHandler.single('file'), changeProfilePicture);
router.post('/changepassword', validateTokenLevel1, changePassword);
router.get('/search', validateTokenLevel2, searchUser)
module.exports = router;