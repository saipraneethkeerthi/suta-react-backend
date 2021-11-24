const jwt = require("jsonwebtoken");
const User = require("../Schema/UserSchema");

//USER AUTHENTICATION
const auth = async (req, res, next) => {
    console.log(req.headers) 
    try {
        if(req.headers.authorization.includes('JWT')){
             next();
        }
        else res.status(401).send({ error: "please authenticate!" });
        // const token = req.headers("authorization").replace("Bearer ", "");
        // console.log(token)
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const user = await User.findOne({
        //     _id: decoded._id,
        //     "tokens.token": token,
        // });
        // if (!user) {
        //     throw new Error();
        // }
        // req.token = token;
        // req.user = user;
       
    } catch (e) {
        res.status(401).send({ error: "please authenticate!" });
    }
};

module.exports = auth;
