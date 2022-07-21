console.log('client code running');
//rest api 호출 시 사용하는 모듈.
const axios = require('axios');

const test = async () => {
	const {
		data: { blogs },
	} = await axios.get('http://localhost:3000/blog');
	console.log(blogs.length, blogs[0]);
};

test();
