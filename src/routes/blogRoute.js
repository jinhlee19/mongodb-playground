const { Router } = require('express');
const blogRouter = Router();

const { isValidObjectId } = require('mongoose');
const { User, Blog } = require('../models');

// 이건 server.js에 있는걸 대체하고싶을 경우 (또는 blogRoute파일에 몰아넣고 싶을 경우) 어차피 블로그 하위이니깐
// blogRouter.use('/:blogId/comment', commentRouter);

blogRouter.post('/', async (req, res) => {
	try {
		const { title, content, islive, userId } = req.body;
		if (typeof title !== 'string') res.status(400).send({ err: 'title is required' });
		if (typeof content !== 'string') res.status(400).send({ err: 'content is required' });
		if (islive && islive !== 'boolean') res.status(400).send({ err: 'islive must be a boolean' });
		if (!isValidObjectId(userId)) res.status(400).send({ err: 'userId is invalid.' });
		let user = await User.findById(userId);
		if (!user) res.status(400).send({ err: 'user does not exist' });

		// let blog = new Blog({ ...req.body, user });
		// Mongoose 업데이트로 인한 수정
		let blog = new Blog({ ...req.body, user: user.toObject() });

		await blog.save();
		return res.send({ blog });
	} catch (err) {
		console.log(err);
		res.status(500).send({ err: err.message });
	}
});

blogRouter.get('/', async (req, res) => {
	try {
		let blogs = await Blog.find({})
			.limit(2)
			.populate([{ path: 'user' }, { path: 'comments', populate: { path: 'user' } }]);
		// let blogs = await Blog.find({}).limit(10).populate({ path: 'user' });
		return res.send({ blogs });
	} catch (err) {
		console.log(err);
		res.status(500).send({ err: err.message });
	}
});

blogRouter.get('/:blogId', async (req, res) => {
	try {
		const { blogId } = req.params;
		if (!isValidObjectId(blogId)) res.status(400).send({ err: 'blogId is invalid.' });
		const blog = await Blog.findOne({ _id: blogId });
		return res.send({ blog });
	} catch (err) {
		console.log(err);
		res.status(500).send({ err: err.message });
	}
});

blogRouter.put('/:blogId', async (req, res) => {
	try {
		const { blogId } = req.params;
		if (!isValidObjectId(blogId)) res.status(400).send({ err: 'blogId is invalid.' });

		const { title, content } = req.body;
		if (typeof title !== 'string') res.status(400).send({ err: 'title is required' });
		if (typeof content !== 'string') res.status(400).send({ err: 'content is required' });

		const blog = await Blog.findOneAndUpdate({ _id: blogId }, { title, content }, { new: true });
		return res.send({ blog });
	} catch (err) {
		console.log(err);
		res.status(500).send({ err: err.message });
	}
});

// 부분수정
blogRouter.patch('/:blogId/live', async (req, res) => {
	try {
		const { blogId } = req.params;
		if (!isValidObjectId(blogId)) return res.status(400).send({ err: 'blogId is invalid.' });

		const { islive } = req.body;
		if (typeof islive !== 'boolean') return res.status(400).send({ err: 'islive is required.' });

		const blog = await Blog.findByIdAndUpdate(blogId, { islive }, { new: true });
		return res.send({ blog });
	} catch (err) {
		console.log(err);
		res.status(500).send({ err: err.message });
	}
});

module.exports = { blogRouter };
