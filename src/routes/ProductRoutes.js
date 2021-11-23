//Importing express and router
const express = require("express");
const product = require("../Schema/ProductSchema");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
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

router.get("/product/:id", (req, res) => {
	let id_val=req.params.id
	console.log(id_val)
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

router.put("/product/:id", (req, res) => {
		const id_val=req.params.id;
		const body=req.body;
		let query={ id: parseInt(id_val) };
		let values={ $set: body }; 
		console.log(id_val)
		product.updateOne(query, values, (err,result)=>{
			if (err) res.status(403).send(err)
			else{
					console.log(result)
					res.status(201).send(result.modifiedCount +"product updated")
			}
		})
});

router.delete("/delete_product/:id", (req, res) => {
	const id_val=req.params.id;
	const body= req.body;
	console.log(id_val);
	let query={ id: parseInt(id_val) };
	let values={ $set: body }; 
	product.deleteOne(query, values,(err,result)=>{
		if (err) res.status(403).send(err)
		else{
				console.log(result)
				res.status(201).send(result.deletedCount +"product deleted")
		}
	})

});

router.delete("/delete_products", (req, res) => {
	product.deleteMany((err,result)=>{
		if (err) res.status(403).send(err)
		else{
				console.log(result)
				res.status(201).send("collection deleted")
		}
})
});

module.exports = router;
