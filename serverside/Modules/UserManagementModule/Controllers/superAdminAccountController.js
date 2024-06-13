const asyncHandler = require('express-async-handler');
const Role = require('../../SystemMonitoringModule/Models/Role');
const ACCESSLEVEL = require('../../../Constants/accessLevel');
const {createUser} = require('../Controllers/userController');
const User = require('../Models/User');
const Account = require('../Models/Account');


//@desc create a new admin
//@route GET api/superadmin/admin/
//@access level 3
const getAdmins = asyncHandler( async(req, res) => {
   const role = await Role.findOne({accessLevel: 2});
   const admins = await User.find({role: role._id});
   if(!admins){
      res.status(404);
      throw new Error("There are no Admins");
   }

   res.status(200).json(admins);
});

//@desc create a new admin
//@route POST api/superadmin/admin/
//@access level 3
const createAdmin = asyncHandler( async(req, res) => {
   const role = await Role.findOne({accessLevel: 2});
   req.body.role = role._id;
   createUser(req, res);
});

//@desc delete existing admin
//@route api/superadmin/admin/:id
//@access level 3
const deleteAdmin = asyncHandler( async(req, res) => {
   const userId = req.params.id;
   const user = await User.find(userId);
   //console.log(user);
   if(!user){
      res.status(404);
      throw new Error("Admin not found");
   }
   console.log("user delete");
   await User.findOneAndDelete(userId);
   //await Account.findOneAndDelete({ownerId: userId});
   res.status(200).json(user);
});

module.exports = {createAdmin, deleteAdmin, getAdmins}