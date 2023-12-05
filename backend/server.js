require('dotenv').config()

const http = require('http');
const express = require('express')
const workoutRoutes = require('./routes/workout')
const mongoose = require('mongoose')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workout', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(process.env.PORT, process.env.HOSTNAME, () => {

			console.log(`Connected to database, Server running at [http://$%7bhostname%7d:$%7bport%7d/%60]http://${process.env.HOSTNAME}:${process.env.PORT}/api/workout`);
		});

	})

	.catch((err) => {
		console.log(err, 'did not connect')
	})


