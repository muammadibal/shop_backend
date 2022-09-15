const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const productLogSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User", required: true },
    productId: { type: "ObjectId", ref: "Product", required: true },
    categoryId: { type: "ObjectId", ref: "ProductCategory", required: true },
    activity: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductLog", productLogSchema);
