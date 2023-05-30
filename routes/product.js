var express = require("express");
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct
} = require("../controllers/productController");
const { auth } = require("../middleware/auth");
var router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_SECRET);

/* GET users listing. */
protectedRouter.get("/all", getAllProduct);
protectedRouter.get("/", getProduct);
protectedRouter.post("/", createProduct);
protectedRouter.put("/", updateProduct);
protectedRouter.delete("/", deleteProduct);

module.exports = router;
