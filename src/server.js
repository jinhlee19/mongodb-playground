const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User } = require('../models/User');

const MONGO_URI =
	'mongodb+srv://jinhlee19:hcfchJR1mlH9mkt5@mongodbtuts.53uls.mongodb.net/BlogService?retryWrites=true&w=majority';

const server = async () => {
	try {
		await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
		console.log('MongoDB has Connected');
		app.use(express.json());

		app.get('/user', async (req, res) => {
			try {
				const users = await User.find({});
				return res.send({ users });
			} catch (err) {}
		});

		app.post('/user', async (req, res) => {
			try {
				const { username, name } = req.body;
				if (!username) return res.status(400).send({ err: 'username is required' });
				if (!name || !name.first || !name.last)
					return res.status(400).send({ err: 'Your first and last name are required.' });
				const user = new User(req.body);
				await user.save();
				return res.send({ user });
			} catch (err) {
				return res.status(500).error({ msg: err });
			}
		});
		app.listen(3000, () => console.log('Server listening on port 3000'));
	} catch (err) {
		console.log(err);
	}
};
server();
