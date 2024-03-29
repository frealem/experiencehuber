const asyncHandler = require('express-async-handler');
const Role = require('../../SystemMonitoringModule/Models/Role');
const ACCESSLEVEL = require('../../../Constants/accessLevel');
const {createUser} = require('../Controllers/userController');

//@desc create a new admin
//@route
//@access
const createAdmin = asyncHandler( async(req, res) => {
   const role = Role.find({accessLevel: 2});
   req.body.role = role._id;
   createUser();
});

module.exports = {createAdmin}