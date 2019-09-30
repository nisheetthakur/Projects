const express = require("express");
const router = express.Router();
const userData = require("../data/user");

router.get("/", async (req, res) => {
	res.render('home');
});

module.exports = router;