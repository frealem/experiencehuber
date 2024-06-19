const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Account = require('../Models/Account');
const Role = require('../../SystemMonitoringModule/Models/Role');
const ACCESSLEVEL = require('../../../Constants/accessLevel');
const paginate = require('../../../Common/pagination');



//@desc get a user by id
//@route GET api/user/:id
//@accesslevel 1
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.params.id});
    console.log(req.params.id)
    if(!user){
        res.status(404);
        throw new Error("User not found!");
    }
    res.status(200).json(user);
})


//@desc get a user by id
//@route GET api/user/
//@accesslevel 1
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.user.id});
    if(!user){
        res.status(404);
        throw new Error("User not found!");
    }
    res.status(200).json(user);
});

//@desc create new user
//@route none
//@accesslevel inaccessible
const createUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {fullName, phone, userName, email, password, role, bio} = req.body;
    if(!userName || !email || !password || !role){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    try{
        const userExist = await User.findOne({email});
        if(userExist){
           res.status(409);
           throw new Error("User with the same email exists");
        }
   
    
    
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        fullName,
        userName,
        profilePictuerURL: null,
        email,
        password: hashedPassword,
        bio,
        role,
    });
    const account = await Account.create({
        ownerId: user.id,
    });
    res.status(200).json(user);
}catch(error){
    console.log(error)
    res.status(409).json({error: "user already exists"})
}
});

//@desc update a user
//@route PUT api/user/changePP
//@accesslevel 1
const changeProfilePicture = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
   user.profilePictuerURL = req.file.filename;
   const updatedUser = await user.save();
   res.status(200).json(updateUser);
});

//@desc update a user
//@route PUT api/user/:id
//@accesslevel 1
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User not ound");
    }

    const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updateUser);
});

//@desc delete a user
//@route DELETE api/user/:id
//@accesslevel 1
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    await User.findOneAndDelete(req.params.id);
    await Account.findOneAndDelete({ownerId: req.params.id});
    res.status(200).json(user);
});

//@desc login a user
//@route POST api/user/login
//@accesslevel public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign(
            {
                user: {
                    userName: user.userName,
                    email: user.email,
                    id: user.id,
                    role: user.role,
                }
            },
            process.env.ACCESS_TOKEN_SECRETE,
            {expiresIn: '4hr'},
        );
        const role = await Role.findOne(user.role);
        const type = role.accessLevel;
        res.status(200).json({type, accessToken}); 
    }else{
        res.status(404);
        throw new Error("User not found");
    }
});

//@desc to register a normal user
//@route POST api/user/changepassword
//@accesslevel public
const changePassword = asyncHandler(async(req, res) =>{
    const {currentPassword, newPassword} = req.body;
    const user = await User.findOne({_id: req.user.id});
    if(user && (await bcrypt.compare(currentPassword, user.password))){
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({msg: "password changed"}); 
    }else{
        res.status(401);
        throw new Error("Acces is not authorized!");
    }
})

//@desc to register a normal user
//@route POST api/user/register
//@accesslevel public
const registerUser = asyncHandler(async(req, res) => {
    const role = await Role.findOne({accessLevel: 1});
    req.body.role = role._id;
    createUser(req, res);
}); 

const searchUser = asyncHandler(async(req, res)=>{
    const { page, pageSize, query} = req.query;
    const role = await Role.findOne({accessLevel: 1});
    const filter = {
       $text: { $search: query },
       role: role._id
    };

    const users = await paginate(User , page, pageSize, filter);
    res.status(200).json(users);
})

module.exports = {getCurrentUser, getUser,createUser,updateUser, deleteUser, registerUser, loginUser, changeProfilePicture, changePassword, searchUser};