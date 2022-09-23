var express = require("express");
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
} = require("../controllers/productController");
const { auth } = require("../middleware/auth");
var router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_SECRET);

/* GET users listing. */
router.get("/all", auth, getAllProduct);
router.get("/", auth, getProduct);
router.post("/", auth, createProduct);
router.put("/", auth, updateProduct);
router.delete("/", auth, deleteProduct);

module.exports = router;
