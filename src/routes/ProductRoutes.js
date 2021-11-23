//Importing express and router
const express = require("express");
const product = require("../Schema/ProductSchema");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const auth =require("../middlewares/auth")
const router = new express.Router();

router.get("/products", (req, res) => {
	product.find({}).then((data) =>{
		if(data){
			res.status(200).send(data)
		}
		else{
			res.status(404).send("No Data Found")
		}
	});
});

router.get("/products/:id",auth, async(req, res) => { 
	let id_val=req.params.id
	console.log(id_val)
	console.log("req.cookies",req.cookies)
	if (req.cookies.jwt) {
		const token = req.cookies.jwt;
		const decoded = await promisify(jwt.verify)(token,config.secret);
		console.log(decoded);
	}
	product.find({_id:id_val},(err,data)=>{
		if(err) res.status(404).send("No Data Found")
		else res.status(200).send(data)		
	})

});

router.post("/products", (req, res) => {
	const body = req.body;
	console.log(body);
	product.insertMany(req.body).then((data) => res.status(200).send(data));
});

router.put("/products/id", (req, res) => {

});

router.delete("/delete_product/id", (req, res) => {

});

router.delete("/delete_product", (req, res) => {

});

module.exports = router;
