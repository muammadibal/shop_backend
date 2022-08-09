import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    balance: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);
