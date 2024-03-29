const { Schema, model, Types } = require('mongoose');
const { CommentSchema } = require('./Comment');

const BlogSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		islive: { type: Boolean, required: true, default: false },
		// 이 user라는 id(ObjectId)는 user(ref) 모델에 해당되는 user id이다.
		// user: { type: Types.ObjectId, required: true, ref: 'user' },
		user: {
			_id: { type: Types.ObjectId, required: true, ref: 'user' },
			username: { type: String, required: true },
			name: {
				first: { type: String, require: true },
				last: { type: String, require: true },
			},
		},
		// comments: [{ type: Types.ObjectId, require: true, ref: 'comment' }],
		comments: [CommentSchema],
	}
	// ,{ timestamps: true }
);

// BlogSchema.virtual('comments', {
// 	ref: 'comment',
// 	localField: '_id',
// 	foreignField: 'blog',
// });

// BlogSchema.set('toObject', { virtuals: true });
// BlogSchema.set('toJSON', { virtuals: true });
// BlogSchema.set('timestamps', true);

const Blog = model('blog', BlogSchema);
module.exports = { Blog };
