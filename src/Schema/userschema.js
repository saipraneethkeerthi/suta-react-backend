//Importing npm modules
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");


/**
 * creating a scheema of record
 * declaring required fields and specifying data type
 */

const UserSchema = new mongoose.Schema({
	userName: { type: String, required: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	phoneNumber: { type: Number },
	bday: { type: String },
	email: { type: String, required: true }

});

UserSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "process.env.JWT_SECRET");
  
	user.tokens = user.tokens.concat({ token });
	await user.save();
  
	return token;
  };

//assigning model to const variable
const User = mongoose.model("User", UserSchema);

//exporting User
module.exports = User;
