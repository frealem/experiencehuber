const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const Account = requrie('../Models/Account');



//@desc get a user by id
//@route 
//@accesslevel 1
const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(404);
        throw new Error("User not found!");
    }
    res.status(200).json(user);
});

//@desc create new user
//@route 
//@accesslevel public
const registerUser = asyncHandler(async (req, res) => {
    const {firstName = null, lastName = null, userName, email, password, role} = req.body;
    if(!userName || !email || !password || !role){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User with the same email exists");
    }
    
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        role,
    });
    res.status(200).json(user);
});

//@desc update a user
//@route 
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
//@route 
//@accesslevel 1
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    await User.findByIdAndRemove(req.params.id);
    await Account.findOneAndRemove({ownerId: req.params.id});
    res.status(200).json(user);
});

//@desc login a user
//@route 
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
            {expiresIn: '1hr'},
        );
        res.status(200).json({accessToken}); 
    }else{
        res.status(401);
        throw new Error("Acces is not authorized!");
    }
});

module.exports = {getCurrentUser, updateUser, deleteUser, registerUser, loginUser};