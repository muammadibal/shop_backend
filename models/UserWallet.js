const { Schema, model } = require("mongoose");

const userWalletSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    balance: Number
  },
  { timestamps: true }
);

module.exports = model("Wallet", userWalletSchema);
