//Importing express and router
const express = require("express");
const product = require("../schema/productschema");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const router = new express.Router();

router.get("/products", (req, res) => {
	product.find({}).then((data) => res.status(200).send(data));
});

router.get("/products/id", (req, res) => {
	let id_val=req.params.id
	console.log(id_val)

});

router.post("/products", (req, res) => {
	const body = req.body;
	console.log(body);
	user.insertMany(req.body).then((data) => res.status(200).send(data));
});

router.put("/products/id", (req, res) => {

});

router.delete("/delete_product/id", (req, res) => {

});

router.delete("/delete_product", (req, res) => {

});
