import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    image: [{ type: "ObjectId", ref: "ProductImage" }],
    description: String,
    price: Number,
    discountPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", productSchema);
