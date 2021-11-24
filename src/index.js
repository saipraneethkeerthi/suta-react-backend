const express = require('express');
const port = 1109
const cors = require('cors');
const app = express();
const userSchemadata = require("./schema/userdata")
const jwt = require('./jwtToken')

app.use(express.json());
app.use(cors());
// app.use(jwt())

require("./database/connect")

// app.use('/',userSchemadata)





app.listen(port, () =>
	console.log("Listening on port: " + port)
)