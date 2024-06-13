const Message = require('../Models/Message');
const io = require('../../../server');
const asyncHandler = require('express-async-handler');

//@desc get all Message with one person
//@route 
//@access level 1
const getMessages = asyncHandler(async (req, res) => {
    //const {page, pageSize} = req.query;
    const page = 1;
    const pageSize = 20;
    console.log(req.params.id)
    const message = await Message
         .find()
         .or([{senderId: req.user.id, recieverId: req.params.id}, {recieverId: req.user.id, senderId: req.params.id}])
         .sort({createdAt: 'desc'})
         .skip((page -1) * pageSize)
         .limit(pageSize);
    res.status(200).json(message);
});

//@desc get a message by id
//@route GET /api/message/:id
//@access level 3
const getMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);
    if(!message){
        res.status(404);
        throw new Error("Message not found!");
    }
    res.status(200).json(message);
});


//@desc get all Message with one person
//@route 
//@access level 1
const createMessage = asyncHandler(async (req, res) => {
    const {senderId, recieverId, content} = req.body.body;
    console.log(req.body);
    if(!senderId || ! recieverId || !content){
        console.log(content);
        res.status(400);
        throw new Error("Mandatory fields are not filled!");
    }
    const message= await Message.create({
        senderId, 
        recieverId, 
        content
    });
    console.log(message)
    res.status(200).json(message);
});

//@desc get all Message with one person
//@route 
//@access level 1
const updateMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);
    if(!message){
        res.status(404);
        throw new Error("Message not ound");
    }

    const updatedMessage = await Message.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatedMessage);
});

//@desc delete a message
//@route 
//@access level 1
const deleteMessage = asyncHandler(async (req, res) => {
    const message = await Message.findById(req.params.id);
    if(!message){
        res.status(404);
        throw new Error("Account not found");
    }

    await Message.findOneAndDelete(req.params.id);
    res.status(200).json(message);
});



module.exports = {getMessages, getMessage, createMessage, updateMessage, deleteMessage}