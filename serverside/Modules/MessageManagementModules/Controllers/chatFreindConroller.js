const chatFreind = require('../Models/chatFreind');
const ChatFreind = require('../Models/chatFreind')
const User = require('../../UserManagementModule/Models/User');
const asyncHandler = require('express-async-handler');

const createChatFreind = asyncHandler(async (req,res) => {
    const {userId} = req.body;
    const chatFreind = await ChatFreind.findOne({userId: req.user.id, freindId: userId});
    const chatFreind1 = await ChatFreind.findOne({freindId: req.user.id, userId: userId});
    if(chatFreind || chatFreind1){
        res.status(200);
        throw new Error("User freind already exists");
    }
    const createdUserFreind = await ChatFreind.create({
        userId: req.user.id,
        freindId: userId,
    });
    res.status(200).json(createdUserFreind);
})

const getChatFreinds = asyncHandler(async (req, res) => {
    console.log("reached here");
    const chatFreind = await ChatFreind.find({ userId: req.user.id });
    const chatFreind1 = await ChatFreind.find({ freindId: req.user.id });
    let chatFreinds = [];
  
    if (!chatFreind && !chatFreind1) {
      res.status(404);
      throw new Error("chat freind not found");
    }
  
    if (chatFreind) {
      for (const element of chatFreind) {
        console.log(element.freindId);
        const user = await User.findById(element.freindId);
        chatFreinds.push(user);
      }
    }
  
    if (chatFreind1) {
      for (const element of chatFreind1) {
        const user = await User.findById(element.userId);
        chatFreinds.push(user);
      }
    }
  
    res.status(200).json(chatFreinds);
  });

const deleteChatFreind = asyncHandler(async (req,res) => {
    const chatFreind = await ChatFreind.find(req.params.id);
    if(!chatFreind){
        res.status(404);
        throw new Error("chat freind not found");
    }
    await ChatFreind.findOneAndDelete(req.params.id);
    res.status(200).json(chatFreind);
})

module.exports = {getChatFreinds, createChatFreind, deleteChatFreind};