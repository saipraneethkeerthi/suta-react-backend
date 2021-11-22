//Importing express and router
const express = require('express');
const user = require('../schema/userschema');
const config = require('../config.json');
const jwt = require('jsonwebtoken');
const router = new express.Router();


router.get('/userGetData', (req, res) => {
	console.log("database post")
	const storeddata = user.find({})
	console.log(storeddata)
	res.status(200).send('')
})
router.post('/signup', (req, res) => {
	const body = req.body;
	console.log(body)
	user.insertMany(req.body).then((data) => res.status(200).send(data))
})
router.post('/login', (req, res) => {
	const body = req.body
	console.log(body)
	user.find(body).then((data) => {
		const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
		console.log(token)
		res.status(200).send(data)
	})
})
module.exports = router;