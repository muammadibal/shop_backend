import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    productId: [{ type: "ObjectId", ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
