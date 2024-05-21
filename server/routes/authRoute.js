const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => { 
  res.status(200).send("Welcome to Student Voice");
});

router.route("/register").get((req, res) => {
  res.status(200).json({ msg: "registration successful from router" });
});

module.exports = router;