const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const transactionProductSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    transactionCode: String,
    transactionDetail: { type: "ObjectId", ref: "Product" },
    transactionPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionProduct", transactionProductSchema);
