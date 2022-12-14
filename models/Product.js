const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User", required: true },
    productCategoryId: {
      type: "ObjectId",
      ref: "ProductCategory",
      required: true,
      default: "",
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    isActive: { type: Number, required: true, default: 1 },
    stock: { type: Number, required: true, default: 1 },
    discountType: { type: String, default: "disable" },
    discountAmount: { type: Number, default: 0 },
    selled: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
