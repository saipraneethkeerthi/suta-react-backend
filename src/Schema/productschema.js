//Importing npm modules
const mongoose = require("mongoose");

/**
 * creating a scheema of record
 * declaring required fields and specifying data type
 */
const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  originalPrice: { type: String },
  offerPrice: { type: String },
  categoryId: { type: String },
  quantity: { type: String },
  image: { type: Array },
  sizechat:{type:Array}
}); 
 
//assigning model to const variable
const Product = mongoose.model("Product", ProductSchema);

//exporting User
module.exports = Product;
