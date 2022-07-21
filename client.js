console.log('client code running');
//rest api 호출 시 사용하는 모듈.
const axios = require('axios');

const URI = 'http://localhost:3000';

const test = async () => {
	let {
		data: { blogs },
	} = await axios.get(`${URI}/blog`);
	// Promise.all을 통해서 await 한꺼번에 처리
	blogs = await Promise.all(
		blogs.map(async blog => {
			// 이부분은 순차적으로 처리
			const [res1, res2] = await Promise.all([
				axios.get(`${URI}/user/${blog.user}`),
				axios.get(`${URI}/blog/${blog._id}/comment`),
			]);
			blog.user = res1.data.user;
			// blog.comments = res2.data.comments;
			blog.comments = await Promise.all(
				res2.data.comments.map(async comment => {
					const {
						data: { user },
					} = (comment.user = await axios.get(`${URI}/user/${comment.user}`));
					comment.user = user;
					return comment;
				})
			);
			return blog;
		})
	);
	console.dir(blogs[0], { depth: 10 });
};

test();
