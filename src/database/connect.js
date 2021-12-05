//Importing mongoose
const mongoose = require('mongoose'); 
//Connected to Database 
const url = process.env.MONGODB_URL 
mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((error) => {
		console.log(error)
	})

const con = mongoose.connection
con.once('open', () => console.log("Database Connected Successfully"))