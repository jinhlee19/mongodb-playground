const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { userRouter, blogRouter, commentRouter } = require('./routes');
// const { blogRouter } = require('./routes/blogRoute');
// const { commentRouter } = require('./routes/commentRoute');
const { generateFakeData } = require('../faker');

const MONGO_URI =
	'mongodb+srv://jinhlee19:hcfchJR1mlH9mkt5@mongodbtuts.53uls.mongodb.net/BlogService?retryWrites=true&w=majority';

const server = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		// mongoose.set('debug', true);
		// generateFakeData(100, 10, 300);

		console.log('MongoDB has Connected');
		app.use(express.json());

		app.use('/user', userRouter);
		app.use('/blog', blogRouter);
		app.use('/blog/:blogId/comment', commentRouter);
		app.listen(3000, () => console.log('Server listening on port 3000'));
	} catch (err) {
		console.log(err);
	}
};
server();
