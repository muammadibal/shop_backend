const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const transactionProductSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User", required: true },
    transactionCode: { type: String, required: true },
    transactionPrice: { type: Number, required: true },
    transactionStatus: { type: String, required: true, default: "pending" },
    transactionTracking: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionProduct", transactionProductSchema);
