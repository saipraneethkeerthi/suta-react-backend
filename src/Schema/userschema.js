//Importing npm modules
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");


/**
 * creating a scheema of record
 * declaring required fields and specifying data type
 */

const UserSchema = new mongoose.Schema({
	userName: { type: String, required: true, minLength:3},
	password: { type: String, required: true, minLength:8},
	email: { type: String, required: true, maxLength: 50 },
	gender: { type: String, enum: ["male", "female","transgender"]},
	phoneNumber: { type: Number, maxLength:12},
	address: { type: String },
	pincode:{ type: String, minLength:6},
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
