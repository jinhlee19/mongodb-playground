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

		// jsonParse 라는 미들웨어를 추가
		app.use(express.json());

		app.get('/', (req, res) => {
			res.send('hello world');
		});

		app.get('/user', (req, res) => {});

		app.post('/user', async (req, res) => {
			// async await 시 trycatch로 감싼다.
			try {
				// document 생성 -> mongoose 인스턴스를 만든다.
				const user = new User(req.body);
				// user에 mongoose의 save메소드가 붙어서 이게 promise를 리턴함 -> await으로 받음. -> 다음줄.
				await user.save();
				return res.send({ user });

				// users.push({ name: 'john doe', age: 40 });
				// users.push({ name: req.body.name, age: req.body.age });
				// return res.send({ success: true });
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
