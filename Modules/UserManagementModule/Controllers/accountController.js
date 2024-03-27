const asyncHanler = require('express-async-handler');
const Account = require('../Models/Account');

//@desc get all accounts
//@route 
//@access public
const getAccounts = asyncHanler(async (req, res) => {
    const account = await Account.find();
    res.status(200).json(account);
});

//@desc get a account by id
//@route 
//@access public
const getAccount = asyncHanler(async (req, res) => {
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
//@access public
const createAccount = asyncHanler(async (req, res) => {
    const {ownerId, 
           profilePictuerURL = null, 
           theme = 0, 
           preferedCategories = null, 
           likedPosts = null, 
           previousPosts = null,
           followings = null,} = req.body;
    if(!ownerId){
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    const account = await Account.Create({
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
//@access public
const updateAccount = asyncHanler(async (req, res) => {
    const account = await Account.findById(req.params.id);
    if(!account){
        res.status(404);
        throw new Error("Account not ound");
    }

    const updateAccount = await Account.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updateAccount);
});

//@desc delete a account
//@route 
//@access public
const deleteAccount = asyncHanler(async (req, res) => {
    const account = await Account.findById(req.params.id);
    if(!account){
        res.status(404);
        throw new Error("Account not found");
    }

    await Account.findByIdAndRemove(req.params.id);
    res.status(200).json(Account);
});



module.exports = {getAccounts, getAccount, createAccount, updateAccount, deleteAccount};