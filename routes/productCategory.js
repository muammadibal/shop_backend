var express = require("express");
const {
  getAllProductCategory,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
} = require("../controllers/productCategoryController");
var router = express.Router();

/* GET users listing. */
router.get("/all", getAllProductCategory);
// router.get("/", getProduct);
router.post("/", createProductCategory);
router.put("/", updateProductCategory);
router.delete("/", deleteProductCategory);

module.exports = router;
