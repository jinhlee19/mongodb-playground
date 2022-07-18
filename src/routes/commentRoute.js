const { Router } = require('express');
const commentRouter = Router();
const { Comment } = require('../models/Comment');

commentRouter.post('/', async (req, res) => {
	return res.send(req.params);
});
commentRouter.get('/');

module.exports = {
	commentRouter,
};
