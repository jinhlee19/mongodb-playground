const express = require('express');
const mongoose = require('mongoose');
const app = express();

const MONGO_URI =
	'mongodb+srv://jinhlee19:hcfchJR1mlH9mkt5@mongodbtuts.53uls.mongodb.net/BlogService?retryWrites=true&w=majority';

try {
	const server = async () => {
		let mongodbConnection = await mongoose.connect(MONGO_URI);

		console.log('mongoDB connected');

		// const users = [{ name: 'rafy', age: 38 }];
		const users = [];

		// jsonParse 라는 미들웨어를 추가
		app.use(express.json());

		app.get('/', function (req, res) {
			return res.send('hello world');
		});
		app.get('/user', function (req, res) {
			// console.log(req);
			return res.send({ users: users });
		});

		app.post('/user', function (req, res) {
			// users.push({ name: 'john doe', age: 40 });
			users.push({ name: req.body.name, age: req.body.age });
			return res.send({ success: true });
		});

		app.listen(3000, function () {
			console.log('Server listening on port 3000');
		});
	};

	server();
} catch (err) {
	console.log(err);
}
