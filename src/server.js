const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { User } = require('../models/User');

const MONGO_URI =
	'mongodb+srv://jinhlee19:hcfchJR1mlH9mkt5@mongodbtuts.53uls.mongodb.net/BlogService?retryWrites=true&w=majority';

try {
	const server = async () => {
		let mongodbConnection = await mongoose.connect(MONGO_URI);
		console.log('mongoDB connected');
		app.use(express.json());

		app.get('/', (req, res) => {
			res.send('hello world');
		});

		app.get('/user', (req, res) => {});

		app.post('/user', async (req, res) => {
			try {
				const user = new User(req.body);
				await user.save();
				return res.send({ user });
			} catch (err) {
				console.log(err);
			}
		});

		app.listen(3000, () => console.log('Server listening on port 3000'));
	};
	server();
} catch (err) {
	console.log(err);
}
