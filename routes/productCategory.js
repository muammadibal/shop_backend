var express = require("express");
const {
  getAllProductCategory,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory
} = require("../controllers/productCategoryController");
const { auth } = require("../middleware/auth");
var router = express.Router();

/* GET users listing. */
router.get("/all", getAllProductCategory);
// router.get("/", getProduct);
router.post("/", auth, createProductCategory);
router.put("/", auth, updateProductCategory);
router.delete("/", auth, deleteProductCategory);

module.exports = router;
