const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: { type: "ObjectId", ref: "User" },
    productId: { type: "ObjectId", ref: "Product" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
