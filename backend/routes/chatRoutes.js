const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel')

router.post('/create_chat', async (req, res) => {
    try{
        const { chatName, adminName } = req.body;

        const adminUser = await User.findOne({ username: adminName });

        const savedChat = await Chat.create({ name: chatName, admin: adminUser._id });
        // add chat to admin's userChats
        const updatedUser = await User.findByIdAndUpdate(
            adminUser._id,
            { $push: { userChats: savedChat._id } },
            { new: true }
        );
    
        if (updatedUser) {
            console.log('User updated:', updatedUser);
        } else {
            console.log('No user found with the given ID');
        }
        // add admin to Chat's users
        await Chat.findByIdAndUpdate(
            savedChat._id,
            { $push: { users: adminUser._id } },
            { new: true }
        );

        res.status(201).json(savedChat);  
        
    } catch (error) {
        console.error('Error creating chat', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/delete_chat', async (req, res) => {
    try{
        const { chatName, username } = req.body;

        const user = await User.findOne({ username: username });

        const chatToDelete = await Chat.findOne({ name: chatName });
        // Check if this user is the chat admin
        if (chatToDelete.admin.toString() !== user._id.toString()) {
            const updatedUser = await User.findByIdAndUpdate(
                user._id,
                { $pull: { userChats: chatToDelete._id } },
                { new: true }
            );
            
            if (updatedUser) {
                console.log('User updated:', updatedUser);
            } else {
                console.log('No user found with the given ID');
            }
            
        } else {
            // Remove the chat from all users' userChats arrays
            await User.updateMany(
                { _id: { $in: chatToDelete.users } }, // Assuming 'users' field contains the IDs of all users in the chat
                { $pull: { userChats: chatToDelete._id } }
            );

            // Delete the chat for everyone
            const deleted = await Chat.findByIdAndDelete(chatToDelete._id);
        }

        res.status(201).json(chatToDelete);  
        
    } catch (error) {
        console.error('Error deleting chat', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



module.exports = router