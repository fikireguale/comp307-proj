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

        res.status(201).json(savedChat);  
        
    } catch (error) {
        console.error('Error creating chat', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router