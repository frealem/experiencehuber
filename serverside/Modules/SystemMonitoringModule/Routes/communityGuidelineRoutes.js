const router = require('express').Router()
const {getCommunityGuideline,
    getCommunityGuidelines,
    createCommunityGuideline,
    updateCommunityGuideline,
    deleteCommunityGuideline
} = require('../Controllers/communityGuidelineController')
const {validateTokenLevel2} = require('../../../Middleware/validateTokenHandler')

router.get('/', getCommunityGuidelines);
router.get('/:id', getCommunityGuideline)
router.post('/', validateTokenLevel2, createCommunityGuideline);
router.put('/:id', validateTokenLevel2, updateCommunityGuideline)
router.delete('/:id', validateTokenLevel2, deleteCommunityGuideline)


module.exports = router