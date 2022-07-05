const addSum = (a, b, callback) => {
	setTimeout(() => {
		if (typeof a !== 'number' || typeof b !== 'number') return callback('a and b must be numbers');
		callback(undefined, a + b);
	}, 3000);
};

// error나 sum을 받는 callback
let callback = (error, sum) => {
	if (error) return console.log({ error });
	console.log({ sum });
};

addSumb(10, 12, callback);

// const addSum = function (a, b, callback) {
// 	setTimeout(function () {
// 		if (typeof a !== 'number' || typeof b !== 'number') callback('a and b must be numbers');
// 		callback(undefined, a + b);
// 	}, 3000);
// };

// callback은 그냥 함수 이름이며, 지금과 같이 non blocking 작업이 끝나고 나서 호출하는 함수를 이렇게 부를 뿐.
