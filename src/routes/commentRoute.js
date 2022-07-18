const { Router } = require('express');
const { isValidObjectId } = require('mongoose');
// blogId까지 같이 가져오게 해준다.
// const commentRouter = Router();
const commentRouter = Router({ mergeParams: true });
const { Comment } = require('../models/Comment');

commentRouter.post('/:commentId', async (req, res) => {
	try {
		const { blogId } = req.params;
		const { content, userId } = req.body;
		if (!isValidObjectId(blogId)) return res.status(400).send({ err: 'blogId is invalid.' });
	} catch (err) {
		return res.send(400).send({ err: err.message });
	}
	return res.send(req.params);
});
commentRouter.get('/');

module.exports = {
	commentRouter,
};
