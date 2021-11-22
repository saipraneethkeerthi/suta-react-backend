//Importing npm modules
const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
	productName: { type: String, required: true },
	originalPrice: { type: String, required: true },
	offerPrice: { type: String, required: true },
	categoryId: { type: String, required: true }
})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product;