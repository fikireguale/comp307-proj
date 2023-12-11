const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel')

router.post('/send_message', async (req, res) => {
    /*
        data =  {“chatName”: “Comp307” ,”username”: "John", “content”: “Hello”, “pin”: false}
        axios.post(`/message/send_message/`, data, config)
	    returns: <nothing/success>
    */
    try{
        const { chatName, username, content, pin } = req.body;

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

            if (!pin) {
                // Update chat with the new message
                const updatedChat = await Chat.findByIdAndUpdate(
                    chat._id,
                    { $push: { messages: msg._id } },
                    { new: true }
                );
            } else {
                // Update chat with the new message
                const updatedChat = await Chat.findByIdAndUpdate(
                    chat._id,
                    { $push: { pins: msg._id } },
                    { new: true }
                );
            }
        }

        res.status(201).json(); 

    } catch (error) {
        console.error('Error sending message', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.get('/get_messages', async (req, res) => {
    /*
        data = {}
	    axios.get(`/message/get_messages?chatName=Comp307&user=John`, data, config)
	    returns: <nothing/success>
    */
    try{
        const { chatName, user } = req.query;

        const userInfo = await User.findOne({ username: user });
        const chatInfo = await Chat.findOne({ name: chatName }).populate('messages');;

        if (!userInfo) {
            return res.status(400).json({ error: 'Invalid user' })
        }
        
        //const allMessages = chatInfo.populate('messages');
        console.log(allMessages)
        res.status(200).json({ allMessages });

    } catch (error) {
        console.error('Error sending message', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/get_pins', async (req, res) => {
    /*
        data = {}
	    axios.get(`/message/get_pins?chatName=Comp307&user=John`, data, config)
        returns: pinned messages as list
    */

    try{
        const { chatName, user } = req.query;

        const userInfo = await User.findOne({ username: user });
        chatInfo = await Chat.findOne({ name: chatName });

        if (!userInfo) {
            return res.status(400).json({ error: 'Invalid user' });
        }
        
        const allMessages = chatInfo.pins;
        console.log(allMessages);
        res.status(200).json({ allMessages });

    } catch (error) {
        console.error('Error sending message', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/un_pin', async (req, res) => {
    /*
    data = {“chatName”: “Comp307” ,”user”: "John", “messageID”: “65765b3a4c39cdead146ade8”}
    axios.post(`/message/un_pin`, data, config)
    returns: <nothing/success>
    */

    try{
        const { chatName, user, messageID } = req.body;

        const userInfo = await User.findOne({ username: user });
        const chatInfo = await Chat.findOne({ name: chatName });
        const pinnedMessage = chatInfo.pins.find(message => message._id.toString() === messageID);

        if (!userInfo) {
            return res.status(400).json({ error: 'Invalid user' });
        }

        if (pinnedMessage) {
            const updatedChat = await Chat.findByIdAndUpdate(
                chatInfo._id,
                { $pull: { pins: pinnedMessage._id } },
                { new: true }
            );
        }

        res.status(200).json();

    } catch (error) {
        console.error('Error sending message', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



module.exports = router