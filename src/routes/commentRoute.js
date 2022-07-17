const { Router } = require('express');
const commentRouter = Router();
const { Comment } = require('../models/Comment');

commentRouter.post('/', async (req, res) => res.send(req.params));
commentRouter.get('/');

module.exports = {
	commentRouter,
};
