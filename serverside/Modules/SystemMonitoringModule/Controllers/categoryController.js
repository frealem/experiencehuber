const asyncHandler = require('express-async-handler');
const Category = require('../Models/Category');

//@desc get all categorys
//@route 
//@access level 2
const getCategories = asyncHandler(async (req, res) => {
    const category = await Category.find();
    res.status(200).json(category);
});

//@desc get a category by id
//@route 
//@access level 2
const getCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(404);
        throw new Error("Category not found!");
    }
    res.status(200).json(category);
});

//@desc create new category
//@route 
//@access level 2
const createCategory = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, description } = req.body;
    if(!name || !description){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    const category = await Category.create({
        name,
        description,
    });
    res.status(200).json(category);
});

//@desc update a category
//@route 
//@access level 2
const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(404);
        throw new Error("Category not ound");
    }

    const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updateCategory);
});

//@desc delete a category
//@route 
//@access level 2
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(404);
        throw new Error("Category not found");
    }

    await Category.findOneAndDelete(req.params.id);
    res.status(200).json(category);
});



module.exports = {getCategories, getCategory, createCategory, updateCategory, deleteCategory};