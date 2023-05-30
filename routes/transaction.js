var express = require("express");
const {
  createTransactionProduct,
  deleteTransactionProduct,
  getTransactionProduct,
  getAllTransactionProduct,
  payTransactionProduct,
  shippingTransactionProduct,
  finishTransactionProduct
} = require("../controllers/transactionProductController");
var router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");
const protectedRouter = withJWTAuthMiddleware(router, process.env.JWT_SECRET);

protectedRouter.get("/all", getAllTransactionProduct);
protectedRouter.get("/", getTransactionProduct);
protectedRouter.post("/", createTransactionProduct);
protectedRouter.put("/pay", payTransactionProduct);
protectedRouter.put("/shipping", shippingTransactionProduct);
protectedRouter.put("/finish", finishTransactionProduct);
protectedRouter.delete("/", deleteTransactionProduct);

module.exports = router;
