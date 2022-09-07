const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    isActive: { type: Number, required: true, default: 1 },
    discountPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
