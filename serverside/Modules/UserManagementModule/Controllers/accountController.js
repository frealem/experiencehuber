const asyncHandler = require('express-async-handler');
const Account = require('../Models/Account');

//@desc get all accounts
//@route 
//@access level 2
const getAccounts = asyncHandler(async (req, res) => {
    const account = await Account.find();
    res.status(200).json(account);
});

//@desc get a account by id
//@route 
//@access level 1
const getAccount = asyncHandler(async (req, res) => {
    const account = await Account.find({ownerId: req.user.id});
    if(!account){
        res.status(404);
        throw new Error("Account not found!");
    }
    const accountToSend = {
        _id: account._id,
        ownerId: account.ownerId,
        profilePictuerURL: account.profilePictuerURL,
        theme: account.theme,
    }
    res.status(200).json(accountToSend);
});

//@desc create new account
//@route 
//@access level 1
const createAccount = asyncHandler(async (req, res) => {
    const {ownerId, 
           profilePictuerURL, 
           theme = 0, 
           preferedCategories, 
           likedPosts = null, 
           previousPosts = null,
           followings = null,} = req.body;
    if(!ownerId){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    const account = await Account.create({
        ownerId, 
        profilePictuerURL, 
        theme, 
        preferedCategories, 
        likedPosts, 
        previousPosts,
        followings,
    });
    res.status(200).json(account);
});

//@desc update a account
//@route 
//@access level 1
const updateAccount = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);
    if(!account){
        res.status(404);
        throw new Error("Account not ound");
    }
    account.profilePictuerURL = req.body.profilePictuerURL;
    account.theme = req.body.theme? req.body.theme : 0;
    if (req.body.preferedCategories) {
        account.preferedCategories.push(...req.body.preferedCategories);
    }

    if (req.body.likedPosts) {
        account.likedPosts.push(...req.body.likedPosts);
    }

    if (req.body.previousPosts) {
        account.previousPosts.push(...req.body.previousPosts);
    }

    if (req.body.followings) {
        account.followings.push(...req.body.followings);
    }
    const updatedAccount = await account.save();
    res.status(200).json(updatedAccount);
});

//@desc delete a account
//@route 
//@access level 1
const deleteAccount = asyncHandler(async (req, res) => {
    const account = await Account.findById(req.params.id);
    if(!account){
        res.status(404);
        throw new Error("Account not found");
    }

    await Account.findByIdAndRemove(req.params.id);
    res.status(200).json(Account);
});



module.exports = {getAccounts, getAccount, createAccount, updateAccount, deleteAccount};