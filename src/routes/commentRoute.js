const { Router } = require('express');
// blogId까지 같이 가져오게 해준다.
// const commentRouter = Router();
const commentRouter = Router({ mergeParams: true });
const { Comment } = require('../models/Comment');

commentRouter.post('/:commentId', async (req, res) => {
	return res.send(req.params);
});
commentRouter.get('/');

module.exports = {
	commentRouter,
};
