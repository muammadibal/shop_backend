const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const transactionProductSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User", required: true },
    transactionCode: { type: String, required: true },
    productId: [{ type: "ObjectId", ref: "Product", required: true }],
    transactionPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionProduct", transactionProductSchema);
