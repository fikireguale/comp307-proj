const express = require('express')
const router = express.Router()
const user = require('../models/userModel')
const bcrypt = require('bcrypt');
const chat = require('../models/chatModel');

// GET all users
router.get('/', (req, res) => {
    res.json({mssg: 'ALL USERS'})
  })

// POST a new user
router.post('/register', async (req, res) =>{
        try {
            // Extract data from the request body
            const { firstName, lastName, email, phoneNumber,
                username, password } = req.body;

              console.log(username, password)

            const hashedPassword = await bcrypt.hash(password, 10);
        
            // Create a new user instance
            const newUser = await user.create({ firstName, lastName, email, phoneNumber,
                username, password: hashedPassword});
        
            // Save the user to the database
            const savedUser = await newUser.save();
        
            res.status(201).json(savedUser); // Respond with the saved user
          } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        
  })


  router.post('/sign_in', async (req, res) =>{
    try{
      // Extract data from the request body
      const { username, password } = req.body;
      const regex = new RegExp(username, 'i');
      const userInfo = await user.findOne({ username: { $regex: regex } });

        if (userInfo) {
          console.log('user found', userInfo);
          const passwordMatch = await bcrypt.compare(password, userInfo.password);

          if(passwordMatch){
            res.status(201).json(userInfo);
            console.log('password match', userInfo);
            return;
          } else {
            // Passwords do not match
            console.error('Wrong user info');
            res.status(401).json({ error: 'Wrong user info' });
            return;
          }
        }else{
          console.error('Wrong user info');
          res.status(401).json({ error: 'Wrong user info' });
          return;
        }
      } catch {
          console.error('Wrong user info');
          res.status(500).json({ error: 'Internal Server Error' });
        }

      })


      router.post('/add_user_chat/', async (req, res) => {
        try {
          
          const { username, chatName } = req.body;
      
          // Find the user by username
          const regex = new RegExp(username, 'i');
          const userInfo = await user.findOne({ username: { $regex: regex } });
          const chatInfo = await chat.findOne({ chatName });

          if (userInfo){

            console.log('user found');
              
            if (chatInfo){
                
              console.log('chat found');  
              for (const userChat of userInfo.userChats) {
                console.log('check existence');
                if (userChat._id.equals(chatInfo._id)) {
                  console.error('UserAlreadyinChat');
                  res.status(401).json({ error: 'User already in chat' });
                  return;
                }
              }
      
              console.log('DNE, add');
              // Add the chat to the user's userChats array
              userInfo.userChats.push(chatInfo._id);
              // Save the updated user document
              const savedUser = await userInfo.save();
              res.status(200).json(savedUser);
                
            
            }else{
              console.error('Chat DNE');
              res.status(401).json({ error: 'No chat' });
              return;
            }

          }else{
            console.error('User DNE');
            res.status(500).json({ error: 'No user' });
            return;
          }  

        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });


      router.get('/get_user_chat/', async (req, res) => {
        try {
          const { username } = req.query;
          const regex = new RegExp(username, 'i');
          const userInfo = await user.findOne({ username: { $regex: regex } }).populate('userChats');; 

          if (userInfo) {
            const chats = userInfo.userChats;
            res.status(200).json({ chats });
          } else {
            res.status(404).json({ error: 'User not found' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });


      router.post('/delete_user_chat/', async (req, res) => {
        try {
          
          const { username, chatName } = req.body;
      
          // Find the user by username
          const regex = new RegExp(username, 'i');
          const userInfo = await user.findOne({ username: { $regex: regex } });
          const chatInfo = await chat.findOne({ chatName });

          if (userInfo){

            console.log('user found');
              
            if (chatInfo){
                
              console.log('chat found');  
                  
              try {
                await userInfo.updateOne({ $pull: { userChats: chatInfo._id } });
                const savedUser = await userInfo.save();
                console.log("deleted")
                res.status(201).json(savedUser);
              } catch (updateErr) {
                console.error('User Not In Chat');
                res.status(401).json({ error: 'User not in chat' });
              }
            } else {
              console.error('Chat DNE');
              res.status(401).json({ error: 'No chat' });
            }
          } else {
            console.error('User DNE');
            res.status(500).json({ error: 'No user' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });

//module.exports = { allUsers, registerUser, authUser };

module.exports = router