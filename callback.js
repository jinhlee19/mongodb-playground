const addSum = (a, b, callback) => {
	setTimeout(function () {
		if (typeof a !== 'number' || typeof b !== 'number') callback('a and b must be numbers');
		callback(undefined, a + b);
	}, 3000);
};

// error나 sum을 받는 callback
let callback = (error, sum) => {
	if (error) console.log({ error });
	console.log({ sum });
};

addSumb(10, 12, callback);

// const addSum = function (a, b, callback) {
// 	setTimeout(function () {
// 		if (typeof a !== 'number' || typeof b !== 'number') callback('a and b must be numbers');
// 		callback(undefined, a + b);
// 	}, 3000);
// };
