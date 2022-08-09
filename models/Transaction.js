import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    totalPrice: Number,
    type: String,
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Transaction", transactionSchema);
