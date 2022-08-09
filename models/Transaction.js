import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    transactionCode: String,
    transactionDetail: String,
    price: Number,
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
