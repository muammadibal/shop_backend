var express = require("express");
const {
  createTransactionProduct,
  deleteTransactionProduct,
  getTransactionProduct,
  getAllTransactionProduct,
  payTransactionProduct,
  shippingTransactionProduct,
  finishTransactionProduct,
} = require("../controllers/transactionProductController");
var router = express.Router();

router.get("/all", getAllTransactionProduct);
router.get("/", getTransactionProduct);
router.post("/", createTransactionProduct);
router.put("/pay", payTransactionProduct);
router.put("/shipping", shippingTransactionProduct);
router.put("/finish", finishTransactionProduct);
router.delete("/", deleteTransactionProduct);

module.exports = router;
