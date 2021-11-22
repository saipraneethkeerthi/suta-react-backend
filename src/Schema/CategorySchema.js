//Importing npm modules
const mongoose = require('mongoose')

/**
 * creating a scheema of record
 * declaring required fields and specifying data type
 */

const CategorySchema = new mongoose.Schema({
	categoryName: { type: String, required: true }
});
//assigning model to const variable
const Category = mongoose.model("Category", CategorySchema);

//exporting User
module.exports = Category;