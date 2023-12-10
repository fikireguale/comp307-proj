const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel')

router.post('/send_message', async (req, res) => {
    try{
        const { chatName, username, content } = req.body;

        const user = await User.findOne({ username: username });
        const chat = await Chat.findOne({ name: chatName });

        if (!user || !chat) {
            return res.status(400).json({ error: 'Invalid sender or chat' });
        }

        // Check if content is not empty
        if (content.trim()) {
            // Create and save the new message
            const msg = new Message({
                sender: user._id,
                chat: chat._id,
                content: content
            });

            await msg.save();

            // Update chat with the new message
            const updatedChat = await Chat.findByIdAndUpdate(
                chat._id,
                { $push: { messages: msg._id } },
                { new: true }
            );
            
        }

        res.status(201).json(); 

    } catch (error) {
        console.error('Error sending message', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router