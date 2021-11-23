//Importing express and router
const express = require("express");
const user = require("../Schema/UserSchema");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const { validateEmail, validatePassword } = require("../middlewares/middlewares")



const router = new express.Router();

// router.get("/users", (req, res) => {
// 	console.log("database post");
// 	const storeddata = user.find({});
// 	console.log(storeddata);
// 	res.status(200).send("");
// });
router.post("/signup", validateEmail, validatePassword, (req, res) => {
	const body = req.body;
	console.log(body);
	user.insertMany(req.body)
	.then((data) => res.status(200).send(data))
	.catch((err) => res.status(404).send("No Data Found"));
});

router.post("/login", (req, res) => {
	const body = req.body;
	// console.log(body);
	user.findOne(body).then(async (data) => {
		console.log(data)
		if (data) {
			// const tokenGen = await user.generateAuthToken();
			const tokenGen = jwt.sign({ sub: data._doc._id }, config.secret, {
				expiresIn: "7d",
			});
			let d = new Date();
			d.setDate(d.getDate() + 30);

			//first-party cookie settings
			res.cookie('jwt', tokenGen, {
				expires: d,
				httpOnly: true,
				secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
				sameSite: 'none'
			});
			const newData = { ...data._doc, token: tokenGen };
			// data.token=tokenGen
			console.log(newData)
			res.status(200).send(newData);

		} else {
			res.status(406).send("No Data Found");

		}

	});
});

module.exports = router;
