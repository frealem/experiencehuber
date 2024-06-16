const asyncHandler = require('express-async-handler');
const CommunityGuideline = require('../Models/CommunityGuideLine')

const getCommunityGuideline = asyncHandler(async(req, res)=>{
    const guideline = await CommunityGuideline.findOne({_id: req.params.id})
    if(!guideline){
        res.status(404);
        throw new Error('guidline not found')
    }
    res.status(200).json(guideline);
})

const getCommunityGuidelines = asyncHandler(async(req, res)=>{
    const guidelines = await CommunityGuideline.find()
    if(!guidelines){
        res.status(404);
        throw new Error('guidline not found')
    }
    res.status(200).json(guidelines);
})

const createCommunityGuideline = asyncHandler(async(req, res)=>{
    const {name, description, reportCase} = req.body;
    if(!name || !description || !reportCase){
        res.status(401);
        throw new Error("madatory fields are not field")
    }
    const guideline = await CommunityGuideline.findOne({name: name})
    console.log(guideline)
    if(guideline !== null){
        res.status(401);
        throw new Error('guidline already exists')
    }
    const createdGuideline = await CommunityGuideline.create({
        name, 
        description,
        reportCase
    })
    res.status(200).json(createdGuideline);
})

const updateCommunityGuideline = asyncHandler(async(req, res)=>{
    const guidline = await CommunityGuideline.findById(req.params.id);
    if(!guidline){
        res.status(404);
        throw new Error("CommunityGuideline not found");
    }

    const guideline = await CommunityGuideline.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(guideline);
})

const deleteCommunityGuideline = asyncHandler(async(req, res)=>{
    const guidline = await CommunityGuideline.findById(req.params.id);
    if(!guidline){
        res.status(404);
        throw new Error("CommunityGuideline not found");
    }

    await CommunityGuideline.findOneAndDelete({_id: req.params.id})
    res.status(200).json(guidline)
})

module.exports = {getCommunityGuideline, getCommunityGuidelines, createCommunityGuideline, updateCommunityGuideline, deleteCommunityGuideline}