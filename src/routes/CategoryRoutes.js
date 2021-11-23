//Importing express and router
const express = require("express");
const category = require("../schema/CategorySchema");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const router = new express.Router();

router.post("/category",(req, res)=>{
    const body= req.body;
    console.log(body);
    category.insertMany(req.body).then((data) => res.status(200).send(data));
});

router.get("/category",(req, res)=>{
    category.find({},(err,data)=>{
        if(err) res.status(404).send("No Data Found")
        else res.status(200).send(data)
    })
});

router.get("/category/:id", (req, res)=>{
    id_val=req.params.id;
    console.log(id_val);
    category.find({_id:id_val},(err,data)=>{
        if(err) res.status(404).send("No Data Found")
        else res.status(200).send(data)
    })
});

module.exports= router;