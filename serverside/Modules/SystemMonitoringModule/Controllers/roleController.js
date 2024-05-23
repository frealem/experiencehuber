const asyncHandler = require('express-async-handler');
const Role = require('../Models/Role');
const paginate = require('../../../Common/pagination');

//@desc get all roles
//@route GET /api/role
//@access level 3
const getRoles = asyncHandler(async (req, res) => {
    const page = 1;
    const pageSize = 2;
    const filter = {};
    const role = await paginate(Role, page, pageSize, filter);
    res.status(200).json(role);
});

//@desc get a role by id
//@route GET /api/role/:id
//@access level 3
const getRole = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);
    if(!role){
        res.status(404);
        throw new Error("Role not found!");
    }
    res.status(200).json(role);
});

//@desc create new role
//@route POST /api/role
//@access level 3
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
//@route PUT /api/role/:id
//@access level 3
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
//@route DELETE /api/role/:id
//@access level 3
const deleteRole = asyncHandler(async (req, res) => {
    const role = await Role.findById(req.params.id);
    if(!role){
        res.status(404);
        throw new Error("Role not found");
    }

    await Role.findByIdAndDelete(req.params.id);
    res.status(200).json(Role);
});



module.exports = {getRoles, getRole, createRole, updateRole, deleteRole};