const { Schema, model, Types } = require('mongoose');

const BlogSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		islive: { type: Boolean, required: true, default: false },
		// 이 user라는 id(ObjectId)는 user(ref) 모델에 해당되는 user id이다.
		user: { type: Types.ObjectId, required: true, ref: 'user' },
		// comments: [{ type: Types.ObjectId, require: true, ref: 'comment' }],
	}
	// { timestamps: true }
);

BlogSchema.virtual('comments', {
	ref: 'comment',
	localField: '_id',
	foreignField: 'blog',
});

BlogSchema.set('toObject', { virtuals: true });
BlogSchema.set('toJSON', { virtuals: true });
// BlogSchema.set('timestamps', true);

const Blog = model('blog', BlogSchema);
module.exports = { Blog };
