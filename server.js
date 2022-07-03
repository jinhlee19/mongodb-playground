const express = require('express');
const app = express();

// const users = [{ name: 'rafy', age: 38 }];
const users = [];
// jsonParse 라는 미들웨어를 추가
app.use(express.json());

app.get('/', function (req, res) {
	return res.send('hello world');
});
app.get('/user', function (req, res) {
	// console.log(req);
	return res.send({ user: users });
});

app.post('/user', function (req, res) {
	// users.push({ name: 'john doe', age: 40 });
	users.push({ name: req.body.name, age: req.body.age });
	return res.send({ success: true });
});

app.listen(3000, function () {
	console.log('Server on 3000');
});
