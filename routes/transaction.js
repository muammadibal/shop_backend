var express = require("express");
const {
  createTransactionProduct,
  deleteTransactionProduct,
  getTransactionProduct,
  getAllTransactionProduct,
} = require("../controllers/transactionProductController");
var router = express.Router();

router.get("/all", getAllTransactionProduct);
router.get("/", getTransactionProduct);
router.post("/", createTransactionProduct);
router.delete("/", deleteTransactionProduct);

module.exports = router;
