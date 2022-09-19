var express = require("express");
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
} = require("../controllers/productController");
var router = express.Router();

/* GET users listing. */
router.get("/all", getAllProduct);
router.get("/", getProduct);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

module.exports = router;
