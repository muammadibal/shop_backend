const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User", required: true },
    image: [{ type: "ObjectId", ref: "ProductImage" }],
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", productSchema);
