const asyncHandler = require('express-async-handler');
const Role = require('../../SystemMonitoringModule/Models/Role');
const ACCESSLEVEL = require('../../../Constants/accessLevel');
const {createUser} = require('../Controllers/userController');
const User = require('../Models/User');
const Account = require('../Models/Account');

//@desc create a new admin
//@route
//@access level 3
const createAdmin = asyncHandler( async(req, res) => {
   const role = Role.find({accessLevel: ACCESSLEVEL.ADMIN});
   req.body.role = role.id;
   createUser();
});

//@desc delete existing admin
//@route
//@access level 3
const deleteAdmin = asyncHandler( async(req, res) => {
   const userId = req.params.id;
   const user = User.find(userId);
   if(!user){
      res.status(404);
      throw new Error("Admin not found");
   }
   await User.findByIdAndRemove(userId);
   await Account.findOneAndRemove({ownerId: userId});
   res.json(user);
})

module.exports = {createAdmin, deleteAdmin}