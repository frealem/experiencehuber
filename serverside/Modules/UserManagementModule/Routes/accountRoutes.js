const router = require('express').Router();
const {getAccounts, getAccount, createAccount, deleteAccount, updateAccount} = require('../Controllers/accountController');
const {validateTokenLevel1} = require('../../../Middleware/validateTokenHandler');
const {getFollowings, 
    getLikedPosts, 
    getPreferedCategories, 
    getPreviousPostes,
    follow,
    like,
    isLiked,
    } = require('../Controllers/normalAccountController');

router.use(validateTokenLevel1);
router.route('/account').get(getAccounts).post(createAccount);
router.route('/account/:id').get(getAccount).delete(deleteAccount);
router.route('/update').put(updateAccount)
router.route('/getPosts',getPreferedCategories);
router.get('/getcategories',getPreferedCategories);
router.get('/getfollowings', validateTokenLevel1, getFollowings);
router.get('/getliked',validateTokenLevel1, getLikedPosts);
router.post('/like/:id', validateTokenLevel1, like);
router.post('/follow/:id', follow);
router.get('/isliked/:id', isLiked);

module.exports = router;