//Importing express and router
const express = require("express");
const user = require("../Schema/userschema");
const config = require("../config.json");
const jwt = require("jsonwebtoken");
const {
  validateEmail,
  validatePassword,
} = require("../middlewares/middlewares");

const router = new express.Router();

router.post("/signup", validateEmail, validatePassword, (req, res) => {
  const body = req.body;
  console.log(body);
  user
    .insertMany(req.body)
    .then((data) => res.status(200).send(data))

    .catch((err) => res.status(404).send(err));
});

router.post("/login", (req, res) => {
  const body = req.body;
  user.findOne(body).then(async (data) => {
    console.log(data);
    if (data) {
      // const tokenGen = await user.generateAuthToken();
      const tokenGen = jwt.sign({ sub: data._doc._id }, config.secret, {
        expiresIn: "7d",
      });
      let d = new Date();
      d.setDate(d.getDate() + 30);

      //first-party cookie settings
      res.cookie("jwt", tokenGen, {
        expires: d,
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        sameSite: "none",
      });
      const newData = { ...data._doc, token: tokenGen };
      // data.token=tokenGen
      console.log(newData);
      res.status(200).send(newData);
    } else {
      res.status(406).send("No Data Found");
    }
  });
});

router.post("/:id/add_to_cart", (req, res) => {
  const body = req.body;
  const id = req.params.id;
  console.log(id, body);
  user
    .updateOne({ _id: id }, { $set: { cartItems: body } })
    .then((data) => res.status(200).send(data))

    .catch((err) => res.status(404).send(err));
});

router.delete("/:id/add_to_cart/:index", (req, res) => {
  // const body = req.body;
  const id = req.params.id;
  const index = req.params.index;
  console.log(index);
  user
    .findOne({ _id: id })
    .then((data) => {
      let newArray = [...data.cartItems];
      newArray = newArray.filter((item, i) => index != i);
      console.log(newArray);
      user
        .updateOne({ _id: id }, { $set: { cartItems: newArray } })
        .then((data) => res.status(200).send(data))

        .catch((err) => res.status(404).send(err));
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = router;
