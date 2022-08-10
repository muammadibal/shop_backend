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
router.get("/product", getAllProduct);
router.get("/product/:id", getProduct);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

module.exports = router;
