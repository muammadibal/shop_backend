import mongoose, { Schema } from "mongoose";

const productImageSchema = new Schema({
  productId: { type: "ObjectId", ref: "Product" },
  image: String,
});

module.exports = mongoose.model("ProductImage", productImageSchema);
