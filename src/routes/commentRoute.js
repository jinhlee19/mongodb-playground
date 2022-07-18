const { Router } = require('express');
const commentRouter = Router({ mergeParams: true });
const { Comment } = require('../models/Comment');

commentRouter.post('/:commentId', async (req, res) => {
	return res.send(req.params);
});
commentRouter.get('/');

module.exports = {
	commentRouter,
};
