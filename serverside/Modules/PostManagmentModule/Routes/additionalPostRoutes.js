const router = require('express').Router();
const {getSpecialPosts,
    getLatestPosts, 
    getPostsByFilter, 
    getPostsByQuery,
    getPostsByPreference,
    getPostsByCurrentUser} = require('../Controllers/additionalPostController');
const {getPosts, getPostsByOwner} = require('../Controllers/postController'); 
const {validateTokenLevel1}= require('../../../Middleware/validateTokenHandler')

router.get('/all',getPosts);
router.get('/latest', getLatestPosts);
router.get('/preference',getPostsByPreference);
router.get('/filter',getPostsByFilter);
router.get('/query', getPostsByQuery);
router.get('/special', getSpecialPosts);
router.get('/owner/:id', getPostsByOwner);
router.get('/current', validateTokenLevel1 , getPostsByCurrentUser)

module.exports = router;