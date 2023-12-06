require('dotenv').config()

const http = require('http');
const express = require('express')
const workoutRoutes = require('./routes/workout')
const mongoose = require('mongoose')
const path = require('path');
const userModel = require('./models/userModel')

//express app
const app = express()
app.use(express.static(path.join(frontend, '/build')));
app.get('*', (req, res) => {
	res.sendFile(path.join(frontend, '/build', 'index.html'));
  });
//middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workout', workoutRoutes)

app.post('/register', async (req, res) =>{
	try {
		// Extract data from the request body
		const { firstName, lastName, email, phoneNumber,
			username, password } = req.body;
	
		// Create a new user instance
		const newUser = new user({ firstName, lastName, email, phoneNumber,
			username, password  });
	
		// Save the user to the database
		const savedUser = await newUser.save();
	
		res.status(201).json(savedUser); // Respond with the saved user
	  } catch (error) {
		console.error('Error creating user:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	  }

})

//connect to db
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, process.env.HOSTNAME, () => {

			console.log(`Connected to database, Server running at [http://$%7bhostname%7d:$%7bport%7d/%60]http://${process.env.HOSTNAME}:${process.env.PORT}`);
		});

	})

	.catch((err) => {
		console.log(err, 'did not connect')
	})


