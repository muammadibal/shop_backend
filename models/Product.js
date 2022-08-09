import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    image: [String],
    description: String,
    price: Number,
    discountPrice: Number,
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Transaction", productSchema);
