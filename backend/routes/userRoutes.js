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
      const userInfo = await user.findOne({ username: username });

        if (userInfo) {
          console.log('user found', userInfo);
          const passwordMatch = await bcrypt.compare(password, userInfo.password);

          if(passwordMatch){
            res.status(201).json(userInfo);
            console.log('password match', userInfo);
          } else {
            // Passwords do not match
            console.error('Wrong user info');
            res.status(401).json({ error: 'Wrong user info' });
          }
        }else{
          console.error('Wrong user info');
          res.status(401).json({ error: 'Wrong user info' });
        }
      } catch {
          console.error('Wrong user info');
          res.status(500).json({ error: 'Internal Server Error' });
        }

      })


      router.post('/add_user_chat/', async (req, res) => {
        try {
          
          const { username, chat } = req.body;
      
          // Find the user by username
          const userInfo = await user.findOne({ username });
      
          // Add the chat to the user's userChats array
          userInfo.userChats.push(chat._id);
      
          // Save the updated user document
          const savedUser = await userInfo.save();
      
          res.status(200).json(savedUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });

      router.delete('/delete_user_chat/', async (req, res) => {
        try {
          
          const { username, chat } = req.body;
      
          // Find the user by username
          const userInfo = await user.findOne({ username });
      
          // Add the chat to the user's userChats array
          userInfo.userChats.push(chat._id);

          userInfo.updateOne({ $pull: { userChats: chatId } }, (updateErr, result) => {
            if (updateErr) {
              console.error(updateErr);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              res.status(200).json({ message: 'Chat removed from userChats' });
            }
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
      

//module.exports = { allUsers, registerUser, authUser };

module.exports = router