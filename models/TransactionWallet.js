import mongoose, { Schema } from "mongoose";

const transactionWalletSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    transactionCode: String,
    transactionPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionWallet", transactionWalletSchema);
