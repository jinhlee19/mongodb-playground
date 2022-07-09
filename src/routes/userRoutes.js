const mongoose = require('mongoose');
const { Router } = require('express');
const { User } = require('../models/User');
const userRouter = Router();

userRouter.get('/', async (req, res) => {
	try {
		const users = await User.find({});
		return res.send({ users });
	} catch (err) {}
});
userRouter.get('/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		if (!mongoose.isValidObjectId(userId)) {
			return res.status(400).send({ err: 'Invalid userId.' });
		}
		const user = await User.findOne({ _id: userId });
		return res.send({ user });
	} catch (err) {
		return res.status(500).send({ msg: err.message });
	}
});
userRouter.delete('/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		if (!mongoose.isValidObjectId(userId)) {
			return res.status(400).send({ err: 'Invalid userId.' });
		}
		// const user = await User.findOneAndDelete({ _id: userId });
		const user = await User.DeleteOne({ _id: userId });
		return res.send({ user });
	} catch (err) {
		return res.status(500).send({ msg: err.message });
	}
});

userRouter.put('/:userId', async (req, res) => {
	try {
		const { userId } = req.params;
		if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: 'Invalid userId.' });
		const { age, name } = req.body;
		if (!age && !name) return res.status(400).send({ err: 'age or name is required' });
		if (age && typeof age !== 'number') return res.status(400).send({ err: 'age must be a number' });
		if (name && typeof name.first !== 'string' && typeof name.last !== 'string')
			return res.status(400).send({ err: 'first and last name must be strings' });
		// let updateBody = {};
		// 수업에서는 빈 부분을 postman에 PUT req 시, 빈 부분이 null 값을 받으나, 현재 버전 기준에서는 이런 오류가 발생하지 않는다. 아래 코드는 이전버전에 제한되는건가?
		// if (age) updateBody.age = age;
		// if (name) updateBody.name = name;

		// const user = await User.findByIdAndUpdate(userId, { age, name }, { new: true });

		// # v.2
		let user = await User.findById(userId);
		console.log({ userBeforeEdit: user });
		if (age) user.age = age;
		if (name) user.name = name;
		console.log({ userAfterEdit: user });
		await user.save();

		return res.send({ user });
	} catch (err) {
		return res.status(500).send({ msg: err.message });
	}
});

userRouter.put('/:userId', async (req, res) => {
	try {
		// console.log(req.params);
		const { userId } = req.params;
		if (!mongoose.isValidObjectId(userId)) {
			return res.status(400).send({ err: 'Invalid userId.' });
		}
		const { age } = req.body;
		// if (typeof age !== 'number') return res.status(400).send({ err: 'age must be a number' });
		//  여기서 new: true 는 출력 이전에 업데이트 반영을 위함.
		const user = await User.findByIdAndUpdate(userId, { $set: { age } }, { new: true });
		return res.send({ user });
	} catch (err) {
		return res.status(500).send({ msg: err.message });
	}
});

userRouter.post('/', async (req, res) => {
	try {
		console.log(req.body);
		const { username, name } = req.body;
		if (!username) return res.status(400).send({ err: 'username is required' });
		if (!name || !name.first || !name.last)
			return res.status(400).send({ err: 'Your first and last name are required.' });
		const user = new User(req.body);
		await user.save();
		return res.send({ user });
	} catch (err) {
		return res.status(500).send({ msg: err.message });
	}
});

module.exports = { userRouter };
