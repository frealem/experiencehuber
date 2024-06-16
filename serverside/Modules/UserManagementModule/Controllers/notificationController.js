const asyncHandler = require('express-async-handler');
const Notification = require('../Models/Notifications');

const createNotification = asyncHandler(async (req, res)=> {
    const {userId, title, detail} = req.body;
    if(!userId || !title || !detail){
        res.status(401);
        throw new Error('required value not here')
    }
    const createdNotification = await Notification.create({
        userId: userId,
        title: title,
        detail: detail
    });

    res.status(200).json(createdNotification)
})

const getNotification = asyncHandler(async (req, res)=> {
    const id = req.params.id;
    const notification = await Notification.findOne({_id: id});
    if(!notification){
        res.status(404);
        throw new Error("notification not found");
    }

    res.status(200).json(notification);
})


const getNotifications  = asyncHandler(async (req, res)=> {
    const id = req.user.id;
    const notifications = await Notification.find({userId: id});
    if(!notifications){
        res.status(404);
        throw new Error("notification not found");
    }
    res.status(200).json(notifications);
})

const deleteNotification = asyncHandler(async (req, res)=> {
    const id = req.params.id;
    const notification = await Notification.findOne({_id: id});
    if(!notification){
        res.status(404);
        throw new Error("notification not found");
    }

    await Notification.findOneAndDelete({_id: id});
    res.status(200).json(notification)
})

module.exports = {getNotification, getNotifications, createNotification, deleteNotification}