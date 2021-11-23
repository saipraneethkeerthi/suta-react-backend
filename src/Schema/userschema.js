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
	name: { type: String, required: true },
	email: { type: String, required: true },
	gender: { type: String},
	phoneNumber: { type: Number },
	address: { type: String},
	pincode:{ type: String},
	state: { type: String},
	country: { type: String},
	cartItems: { type: Array}

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
