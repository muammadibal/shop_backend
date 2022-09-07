var express = require("express");
var router = express.Router();
const { createCart, getAllCart } = require("../controllers/cartController");

/* GET users listing. */
router.get("/", getAllCart);
router.post("/", createCart);

module.exports = router;
