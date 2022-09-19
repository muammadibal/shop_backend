var express = require("express");
var router = express.Router();
const {
  createCart,
  getAllCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");

/* GET users listing. */
router.get("/", getAllCart);
router.post("/", createCart);
router.put("/", updateCart);
router.delete("/", deleteCart);

module.exports = router;
