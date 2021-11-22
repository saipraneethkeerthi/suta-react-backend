//Importing express and router
const express = require("express");
const user = require("../Schema/UserSchema");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const router = new express.Router();

router.get("/userGetData", (req, res) => {
	console.log("database post");
	const storeddata = user.find({});
	console.log(storeddata);
	res.status(200).send("");
});
router.post("/signup", (req, res) => {
	const body = req.body;
	console.log(body);
	user.insertMany(req.body).then((data) => res.status(200).send(data));
});
router.post("/login", (req, res) => {
  const body = req.body;
  // console.log(body);
  user.findOne(body).then((data) => {
    // console.log(data)
    const tokenGen = jwt.sign({ sub: data._doc._id }, config.secret, {
      expiresIn: "7d",
    });
    const newData = { ...data._doc, token: tokenGen };
    // data.token=tokenGen
    // console.log(newData) 
	
		res.status(200).send(newData);
	
  });
});

module.exports = router;
