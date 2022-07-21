const { Router } = require('express');
const { isValidObjectId } = require('mongoose');
// blogId까지 같이 가져오게 해준다.
// const commentRouter = Router();
const commentRouter = Router({ mergeParams: true });
const { Comment } = require('../models/Comment');
const { Blog } = require('../models/Blog');
const { User } = require('../models/User');

commentRouter.post('/', async (req, res) => {
	try {
		const { blogId } = req.params;
		const { content, userId } = req.body;
		if (!isValidObjectId(blogId)) return res.status(400).send({ err: 'blogId is invalid.' });
		if (!isValidObjectId(userId)) return res.status(400).send({ err: 'userId is required' });
		if (typeof content !== 'string') return res.status(400).send({ err: 'content is required' });

		// const blog = await Blog.findByIdAndUpdate(blogId);
		// const user = await User.findByIdAndUpdate(userId);
		// 위를 아래로 -> promise를 통해서 한꺼번에 처리
		const [blog, user] = await Promise.all([Blog.findByIdAndUpdate(blogId), User.findByIdAndUpdate(userId)]);

		console.log(blog, user);
		if (!blog || !user) return res.status(400).send({ err: 'blog or user does not exist' });
		if (!blog.islive) return res.status(400).send({ err: 'blog is not available' });

		const comment = new Comment({ content, user, blog });
		await comment.save();
		return res.send({ comment });
	} catch (err) {
		return res.status(400).send({ err: err.message });
	}
	return res.send(req.params);
});
commentRouter.get('/', async (req, res) => {
	const { blogId } = req.params;
	if (!isValidObjectId(blogId)) return res.status(400).send({ err: 'blogId is required' });
	const comments = await Comment.find({ blog: blogId });
	return res.send({ comments });
});

module.exports = {
	commentRouter,
};
