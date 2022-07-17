const {
	Schema,
	model,
	Types: { ObjectId },
} = require('mongoose');

const CommentSchema = new Schema(
	{
		content: { type: String, require: true },
		user: { type: ObjectId, require: true, req: 'user' },
		blog: { type: ObjectId, require: true, req: 'blog' },
	},
	{ timestamps: true }
);

const Comment = model('comment', 'CommentSchema');

module.export = { Comment };
