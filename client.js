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
			const res1 = await axios.get(`${URI}/user/${blog.user}`);
			const res2 = await axios.get(`${URI}/blog/${blog._id}/comment`);
			blog.user = res1.data.user;
			blog.comments = res2.data.comments;
			return blog;
		})
	);
	console.log(blogs[0]);
};

test();
