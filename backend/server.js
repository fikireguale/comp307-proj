require('dotenv').config()

const http = require('http');
const express = require('express')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes');
const mongoose = require('mongoose')
const path = require('path');
const cors = require('cors');

//express app
const app = express()
app.use(cors());
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/user/',userRoutes)
app.use('/chat/',chatRoutes)
app.use('/message/',messageRoutes)
app.get('*', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
	next()  
});

app.get('/t', (req, res, next) => {
		res.json({mssg: 'GET all workouts'})
		next()	  
})

// routes
//app.use('/api/user/',userRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, process.env.HOSTNAME,() => {
			console.log(`Connected to database, Server running at http://${process.env.HOSTNAME}:${process.env.PORT}/`);

		});

	})

	.catch((err) => {
		console.log(err, 'did not connect')
	})


