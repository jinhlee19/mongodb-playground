const addSum = (a, b) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {
			if (typeof a !== 'number' || typeof b !== 'number') {
				reject('a, b must be numbers');
			}
			resolve(a + b);
		}, 1000);
	});

addSum(10, 20)
	.then(sum1 => addSum(sum1, 3))
	.then(sum1 => addSum(sum1, 3))
	.then(sum1 => addSum(sum1, 3))
	.then(sum1 => addSum(sum1, 3))
	.then(sum => console.log({ sum }))
	.catch(error => console.log({ error }));
