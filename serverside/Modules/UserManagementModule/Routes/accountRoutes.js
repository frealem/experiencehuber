const router = require('express').Router();
const {getAccounts, getAccount, createAccount, deleteAccount, updateAccount} = require('../Controllers/accountController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');
const {getFollwings, 
    getLikedPosts, 
    getPreferedCategories, 
    getPreviousPostes,
    follow,
    like,
    isLiked,
    } = require('../Controllers/normalAccountController');

router.use(validateTokenLevel1);
router.route('/').get(getAccounts).post(createAccount);
router.route('/:id').get(getAccount).put(updateAccount).delete(deleteAccount);
router.route('/getPosts',getPreferedCategories);
router.get('/getcategories',getPreferedCategories);
router.get('/getfollowings',getFollwings);
router.get('/getliked',getLikedPosts);
router.post('/like/:id', like);
router.post('/follow/:id', follow);
router.get('/isliked/:id', isLiked);

module.exports = router;