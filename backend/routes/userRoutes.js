const express = require('express')
const router = express.Router()
const user = require('../models/userModel')

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
        
            // Create a new user instance
            const newUser = await user.create({ firstName, lastName, email, phoneNumber,
                username, password });
        
            // Save the user to the database
            const savedUser = await newUser.save();
        
            res.status(201).json(savedUser); // Respond with the saved user
          } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        
  })

module.exports = router