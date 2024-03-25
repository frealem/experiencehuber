const asyncHandler = require('express-async-handler');
const Role = require('../Models/Role');

//@desc get all roles
//@route 
//@access private
const getRoles = asyncHandler(async (req, res) => {
    const role = await Role.find();
    res.status(200).json(role);
});

//@desc get a role by id
//@route 
//@access private
const getRole = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);
    if(!role){
        res.status(404);
        throw new Error("Role not found!");
    }
    res.status(200).json(role);
});

//@desc create new role
//@route 
//@access private
const createRole = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, description, accessLevel} = req.body;
    if(!name || !description){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    const role = await Role.create({
        name,
        description,
        accessLevel,
    });
    res.status(200).json(role);
});

//@desc update a role
//@route 
//@access private
const updateRole = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);
    if(!role){
        res.status(404);
        throw new Error("Role not ound");
    }

    const updatedRole = await Role.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatedRole);
});

//@desc delete a role
//@route 
//@access private
const deleteRole = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);
    if(!role){
        res.status(404);
        throw new Error("Role not found");
    }

    await Role.findByIdAndRemove(req.params.id);
    res.status(200).json(Role);
});



module.exports = {getRoles, getRole, createRole, updateRole, deleteRole};